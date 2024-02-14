import {
    Component,
    Inject, Input,
    Optional,
} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ResizedEvent} from 'angular-resize-event';
import {take} from 'rxjs/operators';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {EventService} from '../../event/services/event.service';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';
import { HttpParams } from '@angular/common/http';
import {FileFieldRequest} from "../../resources/interface/file-field-request-body";

export interface FileState {
    progress: number;
    uploading: boolean;
    downloading: boolean;
    completed: boolean;
    error: boolean;
}

const preview = 'preview';

const fieldHeight = 75;

/**
 * @deprecated
 * */
/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'ncc-abstract-file-field',
    template: ''
})
export abstract class AbstractFileFieldComponent extends AbstractDataFieldComponent  {

    @Input() dataField: FileField;

    @Input() taskId: string;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        this.state = this.defaultState;
        this.fullSource = new BehaviorSubject<SafeUrl>(null);
    }

    /**
     * Set :
     *  - File field to [FileFieldService]{@link FileFieldService}
     *  - Display name
     */
    ngOnInit() {
        super.ngOnInit();
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
        super.ngOnDestroy();
        this.fullSource.complete();
        this.updatedFieldSubscription.unsubscribe();
    }

    public chooseFile() {
        if (this.state.uploading || this.formControl.disabled) {
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
        const requestBody: FileFieldRequest = {
            parentTaskId: this.resolveParentTaskId(),
            fieldId: this.dataField.stringId,
        }
        fileFormData.append('file', fileToUpload);
        fileFormData.append('data', new Blob([JSON.stringify(requestBody)], {type: 'application/json'}));

        this._taskResourceService.uploadFile(this.taskId, fileFormData, false)
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
                        this.formControl.setValue(this.dataField.value.name);
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

        let params = new HttpParams();
        params = params.set("fieldId", this.dataField.stringId);

        this._taskResourceService.downloadFile(this.resolveParentTaskId(),
            params).subscribe(response => {
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
        const requestBody: FileFieldRequest = {
            parentTaskId: this.resolveParentTaskId(),
            fieldId: this.dataField.stringId
        }

        this._taskResourceService.deleteFile(this.taskId, requestBody).pipe(take(1)).subscribe(response => {
            if (response.success) {
                const filename = this.dataField.value.name;
                this.dataField.value = {};
                this.formControl.setValue('');
                this.dataField.update();
                this.dataField.downloaded = false;
                this.fullSource.next(undefined);
                this.fileForDownload = undefined;
                this.previewSource = undefined;
                this.fileForPreview = undefined;
                this._log.debug(`File [${this.dataField.stringId}] ${filename} was successfully deleted`);
                this.formControl.markAsTouched();
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
        let params = new HttpParams()
        params = params.set("fieldId", this.dataField.stringId);
        this._taskResourceService.downloadFilePreview(this.resolveParentTaskId(), params).subscribe(response => {
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

        let params = new HttpParams();
        params = params.set("fieldId", this.dataField.stringId);

        this._taskResourceService.downloadFile(this.resolveParentTaskId(), params).subscribe(response => {
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
        return `${AbstractFileFieldComponent.DEFAULT_PREVIEW_BORDER_WIDTH}px`;
    }

    public getPreviewBorderStyle(): string {
        if (this.borderPropertyEnabled('borderStyle')) {
            return this.dataField.component.properties.borderStyle;
        }
        return AbstractFileFieldComponent.DEFAULT_PREVIEW_BORDER_STYLE;
    }

}
