import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild
} from "@angular/core";
import {FileField, FilePreviewType} from "../models/file-field";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {BehaviorSubject, Subscription} from "rxjs";
import {TaskResourceService} from "../../../resources/engine-endpoint/task-resource.service";
import {LoggerService} from "../../../logger/services/logger.service";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../../event/services/event.service";
import {FileFieldIdBody} from "../../models/file-field-id-body";
import {EventOutcomeMessageResource} from "../../../resources/interface/message-resource";
import {ProgressType, ProviderProgress} from "../../../resources/resource-provider.service";
import {ChangedFieldsMap} from "../../../event/services/interfaces/changed-fields-map";
import {HttpParams} from "@angular/common/http";
import {take} from "rxjs/operators";
import {ResizedEvent} from "angular-resize-event";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

export interface FileState {
    progress: number;
    uploading: boolean;
    downloading: boolean;
    completed: boolean;
    error: boolean;
}

const preview = 'preview';

const fieldHeight = 75;

const fieldPadding = 16;

@Component({
    selector: 'ncc-abstract-file-default-fied',
    template: ''
})
export abstract class AbstractFileDefaultFieldComponent extends AbstractBaseDataFieldComponent<FileField> implements OnInit, AfterViewInit, OnDestroy {
    /**
     * The width of the default file preview border in pixels. The `px` string is appended in the code.
     */
    public static readonly DEFAULT_PREVIEW_BORDER_WIDTH = 0;
    /**
     * The CSS style attribute of the default file preview border.
     */
    public static readonly DEFAULT_PREVIEW_BORDER_STYLE = 'none';
    /**
     * The CSS color string of the default file preview border.
     */
    public static readonly DEFAULT_PREVIEW_BORDER_COLOR = 'black';

    public state: FileState;
    /**
     * Task mongo string id is binding property from parent component.
     */
    @Input() public taskId: string;

    /**
     * File picker element reference from component template that is initialized after view init.
     */
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;
    /**
     * Image field view element reference from component template that is initialized after view init.
     */
    @ViewChild('imageEl') public imageEl: ElementRef;

    @ViewChild('imageDiv') public imageDivEl: ElementRef;
    /**
     * If file preview should be displayed
     */
    public filePreview = false;
    /**
     * If file type can be displayed
     */
    public isDisplayable = false;
    /**
     * Max height of preview
     */
    private maxHeight: string;
    /**
     * Store file for preview
     */
    private fileForPreview: Blob;
    /**
     * Url of preview file
     */
    public previewSource: SafeUrl;
    /**
     * Store file to show/download
     */
    private fileForDownload: Blob;
    /**
     * Full size file url
     */
    public fullSource: BehaviorSubject<SafeUrl>;
    /**
     * Extension of file to preview
     */
    public previewExtension: FilePreviewType;
    /**
     * Form control subscription
     */
    private updatedFieldSubscription: Subscription;

    /**
     * Only inject services.
     * @param _taskResourceService Provides to download a file from the backend
     * @param _log Logger service
     * @param _snackbar Snackbar service to notify user
     * @param _translate Translate service for I18N
     * @param _eventService used for parsing of backend response
     * @param informAboutInvalidData whether the backend should be notified about invalid values.
     * Option injected trough `NAE_INFORM_ABOUT_INVALID_DATA` InjectionToken
     * @param _sanitizer Sanitize url of image preview
     * @param dataFieldPortalData Field and form control data if field is provided with portal
     */
    protected constructor(protected _taskResourceService: TaskResourceService,
                          protected _log: LoggerService,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService,
                          protected _eventService: EventService,
                          protected _sanitizer: DomSanitizer,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileField>) {
        super(dataFieldPortalData);
        this.state = this.defaultState;
        this.fullSource = new BehaviorSubject<SafeUrl>(null);
        this.taskId = dataFieldPortalData.additionalFieldProperties.taskId as string;
    }

    /**
     * Set :
     *  - File field to [FileFieldService]{@link FileFieldService}
     *  - Display name
     */
    ngOnInit() {
        this.filePreview = this.dataField && this.dataField.component && this.dataField.component.name
            && this.dataField.component.name === preview;
    }

    ngAfterViewInit() {
        if (this.fileUploadEl) {
            this.fileUploadEl.nativeElement.onchange = () => {
                this.upload();
            };
        }
        if (this.filePreview) {
            if (!!this.imageDivEl) {
                if (!this.isEmpty()) {
                    this.initializePreviewIfDisplayable();
                }
            }
        }
        this.updatedFieldSubscription = this.dataField.updated.subscribe(() => {
            this.previewSource = undefined;
            if (!!this.filePreview
                && !!this.dataField.value
                && !!this.dataField.value.name) {
                this.fileForDownload = undefined;
                this.fileForPreview = undefined;
                this.initializePreviewIfDisplayable();
            }
        })
    }

    ngOnDestroy(): void {
        this.fullSource.complete();
        this.updatedFieldSubscription.unsubscribe();
    }

    public chooseFile() {
        if (this.state.uploading || this.formControlRef.disabled) {
            return;
        }
        this.fileUploadEl.nativeElement.click();
    }

    /**
     * Call after click on file field.
     *
     * If file field has no file uploaded
     * [FilesUploadComponent]{@link AbstractFilesUploadComponent} via [SideMenu]{@link SideMenuService} opens.
     *
     * Otherwise opens a file picker from which the user can select files.
     */
    public upload() {
        if (!this.fileUploadEl.nativeElement.files || this.fileUploadEl.nativeElement.files.length === 0) {
            return;
        }
        if (!this.taskId) {
            this._log.error('File cannot be uploaded. No task is set to the field.');
            return;
        }
        if (this.dataField.value &&
            this.dataField.value.name &&
            this.fileUploadEl.nativeElement.files.item(0).name === this.dataField.value.name) {
            this._log.error('User chose the same file. Uploading skipped');
            this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.wontUploadSameFile'));
            this.fileUploadEl.nativeElement.value = '';
            return;
        }
        if (this.dataField.maxUploadSizeInBytes &&
            this.dataField.maxUploadSizeInBytes < this.fileUploadEl.nativeElement.files.item(0).size) {
            this._log.error('File cannot be uploaded. Maximum size of file exceeded.');
            this._snackbar.openErrorSnackBar(
                this._translate.instant('dataField.snackBar.maxFilesSizeExceeded') + this.dataField.maxUploadSizeInBytes
            );
            this.fileUploadEl.nativeElement.value = '';
            return;
        }
        this.state = this.defaultState;
        this.state.uploading = true;
        const fileFormData = new FormData();
        const fileToUpload = this.fileUploadEl.nativeElement.files.item(0) as File;
        const data: FileFieldIdBody = {};
        data[this.resolveParentTaskId()] = this.dataField.stringId;
        fileFormData.append('file', fileToUpload);
        fileFormData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
        this._taskResourceService.uploadFile(this.taskId, this.dataField.stringId, fileFormData, false)
            .subscribe((response: EventOutcomeMessageResource) => {
                if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                    this.state.progress = (response as ProviderProgress).progress;
                } else {
                    this.state.completed = true;
                    this.state.uploading = false;
                    this.state.progress = 0;

                    if (response.error) {
                        this.state.error = true;
                        this._log.error(
                            `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0)} uploading has failed!`, response.error
                        );
                        if (response.error) {
                            this._snackbar.openErrorSnackBar(this._translate.instant(response.error));
                        } else {
                            this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.fileUploadFailed'));
                        }
                    } else {
                        const changedFieldsMap: ChangedFieldsMap = this._eventService.parseChangedFieldsFromOutcomeTree(response.outcome);
                        this.dataField.emitChangedFields(changedFieldsMap);
                        this._log.debug(
                            `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0).name} was successfully uploaded`
                        );
                        this.state.error = false;
                        this.dataField.downloaded = false;
                        this.dataField.value.name = fileToUpload.name;
                        if (this.filePreview) {
                            this.initializePreviewIfDisplayable();
                        }
                        this.fullSource.next(undefined);
                        this.fileForDownload = undefined;
                        this.formControlRef.setValue(this.dataField.value.name);
                    }
                    this.dataField.touch = true;
                    this.dataField.update();
                    this.fileUploadEl.nativeElement.value = '';
                }
            }, error => {
                this.state.completed = true;
                this.state.error = true;
                this.state.uploading = false;
                this.state.progress = 0;
                this._log.error(
                    `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0)} uploading has failed!`, error
                );
                if (error?.error?.message) {
                    this._snackbar.openErrorSnackBar(this._translate.instant(error.error.message));
                } else {
                    this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.fileUploadFailed'));
                }
                this.dataField.touch = true;
                this.dataField.update();
                this.fileUploadEl.nativeElement.value = '';
            });
    }

    public download() {
        if (!this.checkFileBeforeDownload()) {
            return;
        }
        if (!!this.fileForDownload) {
            this.downloadViaAnchor(this.fileForDownload);
            return;
        }
        this.state = this.defaultState;
        this.state.downloading = true;
        this._taskResourceService.downloadFile(this.resolveParentTaskId(),
            this.dataField.stringId).subscribe(response => {
            if (!(response as ProviderProgress).type || (response as ProviderProgress).type !== ProgressType.DOWNLOAD) {
                this._log.debug(`File [${this.dataField.stringId}] ${this.dataField.value.name} was successfully downloaded`);
                this.downloadViaAnchor(response as Blob);
                if (this.filePreview) {
                    this.initDownloadFile(response);
                }
                this.state.downloading = false;
                this.state.progress = 0;
                this.dataField.downloaded = true;
            }
        }, error => {
            this._log.error(`Downloading file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, error);
            this._snackbar.openErrorSnackBar(
                this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.downloadFail')
            );
            this.state.downloading = false;
            this.state.progress = 0;
        });
    }

    private initDownloadFile(response: Blob | ProviderProgress) {
        if (response instanceof Blob) {
            if (this.previewExtension === FilePreviewType.pdf) {
                this.fileForDownload = new Blob([response], {type: 'application/pdf'});
                this.fullSource.next(this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.fileForDownload)));
            } else {
                this.fileForDownload = new Blob([response], {type: 'application/octet-stream'});
                this.fullSource.next(this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileForDownload)));
            }
        }
    }

    protected downloadViaAnchor(blob: Blob): void {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        if (!this.fileForDownload) {
            blob = new Blob([blob], {type: 'application/octet-stream'});
        }
        const url = window.URL.createObjectURL(!!this.fileForDownload ? this.fileForDownload : blob);
        a.href = url;
        a.download = this.dataField.value.name;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    public deleteFile() {
        if (!this.dataField.value || !this.dataField.value.name) {
            return;
        }
        if (!this.taskId) {
            this._log.error('File cannot be deleted. No task is set to the field.');
            return;
        }
        let param = new HttpParams();
        param = param.set("parentTaskId", this.resolveParentTaskId());

        this._taskResourceService.deleteFile(this.taskId,
            this.dataField.stringId, undefined, param).pipe(take(1)).subscribe(response => {
            if (response.success) {
                const filename = this.dataField.value.name;
                this.dataField.value = {};
                this.formControlRef.setValue('');
                this.dataField.update();
                this.dataField.downloaded = false;
                this.fullSource.next(undefined);
                this.fileForDownload = undefined;
                this.previewSource = undefined;
                this.fileForPreview = undefined;
                this._log.debug(`File [${this.dataField.stringId}] ${filename} was successfully deleted`);
                this.formControlRef.markAsTouched();
            } else {
                this._log.error(`Deleting file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, response.error);
                this._snackbar.openErrorSnackBar(
                    this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.fileDeleteFailed')
                );
            }
        });
    }

    isEmpty(): boolean {
        return !this.dataField.value || !this.dataField.value.name;
    }

    protected get defaultState(): FileState {
        return {
            progress: 0,
            completed: false,
            error: false,
            uploading: false,
            downloading: false
        };
    }

    /**
     * Construct display name.
     */
    public constructDisplayName(): string {
        if (!!this.dataField) {
            if (!!this.dataField.value && !!this.dataField.value.name) {
                return this.dataField.value.name;
            } else if (!!this.dataField.placeholder) {
                return this.dataField.placeholder;
            }
        }
        return this._translate.instant('dataField.file.noFile');
    }

    /**
     * Initialize file field image from backend if it is image type.
     */
    protected initFileFieldImage() {
        if (!this.checkFileBeforeDownload()) {
            return;
        }
        this.state.downloading = true;
        this._taskResourceService.downloadFilePreview(this.resolveParentTaskId(), this.dataField.stringId).subscribe(response => {
            if (response instanceof Blob) {
                this._log.debug(`Preview of file [${this.dataField.stringId}] ${this.dataField.value.name} was successfully downloaded`);
                this.fileForPreview = new Blob([response], {type: 'application/octet-stream'});
                this.previewSource = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileForPreview));
            }
            if (response == null || response instanceof Blob) {
                this.state.downloading = false;
            }
        }, error => {
            this._log.error(`Downloading file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, error);
            this._snackbar.openErrorSnackBar(
                this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.downloadFail')
            );
            this.state.downloading = false;
            this.state.progress = 0;
        });
    }

    private checkFileBeforeDownload() {
        if (this.isEmpty()) {
            return false;
        }
        if (!this.taskId) {
            this._log.error('File cannot be downloaded. No task is set to the field.');
            return false;
        }
        return true;
    }

    public showPreviewDialog() {
        if (!this.checkFileBeforeDownload()) {
            return;
        }
        this._taskResourceService.downloadFile(this.resolveParentTaskId(), this.dataField.stringId).subscribe(response => {
            if (!(response as ProviderProgress).type || (response as ProviderProgress).type !== ProgressType.DOWNLOAD) {
                this._log.debug(`File [${this.dataField.stringId}] ${this.dataField.value.name} was successfully downloaded`);
                this.initDownloadFile(response);
            }
        }, error => {
            this._log.error(`Downloading file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, error);
            this._snackbar.openErrorSnackBar(
                this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.downloadFail')
            );
            this.state.progress = 0;
        });
    }

    public changeMaxWidth(event: ResizedEvent) {
        if (!!this.imageEl) {
            this.imageEl.nativeElement.style.maxWidth = event.newRect.width + 'px';
        }
    }

    private initializePreviewIfDisplayable() {
        const extension = this.dataField.value.name.split('.').reverse()[0];
        this.isDisplayable = Object.values(FilePreviewType).includes(extension as any);
        if (this.isDisplayable) {
            this.previewExtension = FilePreviewType[extension];
            this.initFileFieldImage();
        }
    }

    public getHeight() {
        return this.dataField.layout && this.dataField.layout.rows && this.dataField.layout.rows !== 1 ?
            (this.dataField.layout.rows) * fieldHeight - fieldPadding : fieldHeight - fieldPadding;
    }

    public getPreviewBorderWidth(): string {
        if (this.borderPropertyEnabled('borderWidth')) {
            return this.dataField.component.properties.borderWidth + 'px';
        }
        return `${AbstractFileDefaultFieldComponent.DEFAULT_PREVIEW_BORDER_WIDTH}px`;
    }

    public getPreviewBorderStyle(): string {
        if (this.borderPropertyEnabled('borderStyle')) {
            return this.dataField.component.properties.borderStyle;
        }
        return AbstractFileDefaultFieldComponent.DEFAULT_PREVIEW_BORDER_STYLE;
    }

    public getPreviewBorderColor(): string {
        if (this.borderPropertyEnabled('borderColor')) {
            return this.dataField.component.properties.borderColor;
        }
        return AbstractFileDefaultFieldComponent.DEFAULT_PREVIEW_BORDER_COLOR;
    }

    public isBorderLGBTQ(): boolean {
        if (this.borderPropertyEnabled('borderLGBTQ')) {
            return this.dataField.component.properties.borderLGBTQ === 'true';
        }
        return false;
    }

    public isBorderDefault(): boolean {
        if (this.borderPropertyEnabled('borderEnabled')) {
            return this.dataField.component.properties.borderEnabled === 'true';
        }
        return false;
    }

    public borderPropertyEnabled(property: string): boolean {
        return !!this.dataField.component && !!this.dataField.component.properties && property in this.dataField.component.properties;
    }

    protected resolveParentTaskId(): string {
        return !!this.dataField.parentTaskId ? this.dataField.parentTaskId : this.taskId;
    }
}
