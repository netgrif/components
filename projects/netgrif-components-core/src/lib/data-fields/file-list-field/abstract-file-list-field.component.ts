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
} from '@angular/core';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {ProgressType, ProviderProgress} from '../../resources/resource-provider.service';
import {FileListField, FileListFieldValidation} from './models/file-list-field';
import {FileFieldValue} from '../file-field/models/file-field-value';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {take} from 'rxjs/operators';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {EventService} from '../../event/services/event.service';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';
import {Subscription} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {FileFieldRequest} from "../../resources/interface/file-field-request-body";

export interface FilesState {
    progress: number;
    uploading: boolean;
    downloading: boolean;
    completed: boolean;
    error: boolean;
}

@Component({
    selector: 'ncc-abstract-filelist-field',
    template: ''
})
export abstract class AbstractFileListFieldComponent extends AbstractDataFieldComponent implements OnInit, AfterViewInit, OnDestroy {

    public uploadedFiles: Array<string>;
    public state: FilesState;
    private valueChange$: Subscription;

    /**
     * Values from file list field validation (eg. maxFiles 5)
     * maxFilesNumber - maximum uploadable files
     * maxFilesMessage - error message if number of files is exceeded
     */
    protected maxFilesNumber: number;
    protected maxFilesMessage: string;

    /**
     * Task mongo string id is binding property from parent component.
     */
    @Input() public taskId: string;
    /**
     * Binding property as instance from parent component.
     */
    @Input() public dataField: FileListField;
    /**
     * File picker element reference from component template that is initialized after view init.
     */
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    protected constructor(protected _taskResourceService: TaskResourceService,
                          protected _log: LoggerService,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService,
                          protected _eventService: EventService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        this.state = this.defaultState;
        this.uploadedFiles = new Array<string>();
        this.maxFilesNumber = Number.POSITIVE_INFINITY;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.valueChange$ = this.dataField.valueChanges().subscribe(() => {
            this.parseResponse();
        });
        if (this.dataField.validations && this.dataField.validations.length !== 0) {
            const val = this.dataField.validations.find(validation =>
                validation.validationRule.includes(FileListFieldValidation.MAX_FILES)
            );
            if (val && val.validationRule.split(' ').length === 2 && !isNaN(parseInt(val.validationRule.split(' ')[1], 10))) {
                this.maxFilesNumber = parseInt(val.validationRule.split(' ')[1], 10);
                this.maxFilesMessage = val.validationMessage && val.validationMessage !== '' ? val.validationMessage : null;
            }
        }
    }

    /**
     * Set file picker and image elements to [FileFieldService]{@link FileFieldService}.
     *
     * Initialize file image.
     */
    ngAfterViewInit(): void {
        if (this.fileUploadEl) {
            this.fileUploadEl.nativeElement.onchange = () => {
                this.upload();
            };
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.valueChange$.unsubscribe();
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
        if (this.fileUploadEl.nativeElement.files.length + this.uploadedFiles.length > this.maxFilesNumber) {
            this._snackbar.openErrorSnackBar(this.maxFilesMessage ? this.maxFilesMessage :
                this._translate.instant('dataField.snackBar.maxFilesExceeded') + this.maxFilesNumber
            );
            this.fileUploadEl.nativeElement.value = '';
            return;
        }

        let filesToUpload = Array.from(this.fileUploadEl.nativeElement.files);
        let sum = 0;
        filesToUpload.forEach(item => sum += item.size);
        if (this.dataField.maxUploadSizeInBytes &&
            this.dataField.maxUploadSizeInBytes < sum) {
            this._log.error('Files cannot be uploaded. Maximum size of files exceeded.');
            this._snackbar.openErrorSnackBar(
                this._translate.instant('dataField.snackBar.maxFilesSizeExceeded') + this.dataField.maxUploadSizeInBytes
            );
            this.fileUploadEl.nativeElement.value = '';
            return;
        }

        if (this.dataField.value && this.dataField.value.namesPaths && this.dataField.value.namesPaths.length !== 0) {
            this.dataField.value.namesPaths.forEach(namePath => {
                filesToUpload = filesToUpload.filter(fileToUpload => fileToUpload.name !== namePath.name);
            });
            if (filesToUpload.length === 0) {
                this._log.error('User chose the same files that are already uploaded. Uploading skipped');
                this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.wontUploadSameFiles'));
                this.fileUploadEl.nativeElement.value = '';
                return;
            }
        }

        this.state = this.defaultState;
        this.state.uploading = true;
        const fileFormData = new FormData();

        filesToUpload.forEach(fileToUpload => {
            fileFormData.append('files', fileToUpload);
        });
        const requestBody: FileFieldRequest = {
            parentTaskId: this.resolveParentTaskId(),
            fieldId: this.dataField.stringId,
        }
        fileFormData.append('data', new Blob([JSON.stringify(requestBody)], {type: 'application/json'}));
        this._taskResourceService.uploadFile(this.taskId, fileFormData, true)
            .subscribe((response: EventOutcomeMessageResource) => {
                if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                    this.state.progress = (response as ProviderProgress).progress;
                } else {
                    this.state.completed = true;
                    this.state.uploading = false;
                    this.state.progress = 0;
                    this._log.debug(
                        `Files [${this.dataField.stringId}] were successfully uploaded`
                    );
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
                        this.state.error = false;
                        filesToUpload.forEach(fileToUpload => {
                            this.uploadedFiles.push(fileToUpload.name);
                            this.dataField.value.namesPaths.push({name: fileToUpload.name});
                            this.formControl.setValue(this.dataField.value.namesPaths.map(namePath => {
                                return namePath['name'];
                            }).join('/'));
                        });
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
                if (error?.error?.message) {
                    this._snackbar.openErrorSnackBar(this._translate.instant(error.error.message));
                } else {
                    this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.fileUploadFailed'));
                }
                this._log.error(
                    `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0)} uploading has failed!`, error
                );
                this.dataField.touch = true;
                this.dataField.update();
                this.fileUploadEl.nativeElement.value = '';
            });
    }

    public download(fileName: string) {
        if (!this.dataField.value || !this.dataField.value.namesPaths ||
            !this.dataField.value.namesPaths.find(namePath => namePath.name === fileName)) {
            return;
        }
        if (!this.taskId) {
            this._log.error('File cannot be downloaded. No task is set to the field.');
            return;
        }
        this.state = this.defaultState;
        this.state.downloading = true;

        let params = new HttpParams();
        params = params.set("fieldId", this.dataField.stringId);
        params = params.set("fileName", fileName);

        this._taskResourceService.downloadFile(this.resolveParentTaskId(),
            params).subscribe(response => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.DOWNLOAD) {
                this.state.progress = (response as ProviderProgress).progress;
            } else {
                this._log.debug(`File [${this.dataField.stringId}] ${fileName} was successfully downloaded`);
                this.downloadViaAnchor(response as Blob, fileName);
                this.state.downloading = false;
                this.state.progress = 0;
                this.dataField.downloaded.push(fileName);
            }
        }, error => {
            this._log.error(`Downloading file [${this.dataField.stringId}] ${fileName} has failed!`, error);
            this._snackbar.openErrorSnackBar(fileName + ' ' + this._translate.instant('dataField.snackBar.downloadFail'));
            this.state.downloading = false;
            this.state.progress = 0;
        });
    }

    protected downloadViaAnchor(blob: Blob, fileName: string): void {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        blob = new Blob([blob], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    public deleteFile(fileName: string) {
        if (!this.dataField.value || !this.dataField.value.namesPaths ||
            !this.dataField.value.namesPaths.find(namePath => namePath.name === fileName)) {
            return;
        }
        if (!this.taskId) {
            this._log.error('File cannot be deleted. No task is set to the field.');
            return;
        }

        const requestBody: FileFieldRequest = {
            parentTaskId: this.resolveParentTaskId(),
            fieldId: this.dataField.stringId,
            fileName
        }

        this._taskResourceService.deleteFile(this.taskId, requestBody).pipe(take(1)).subscribe((response: EventOutcomeMessageResource) => {
            if (response.success) {
                const changedFieldsMap: ChangedFieldsMap = this._eventService.parseChangedFieldsFromOutcomeTree(response.outcome);
                this.dataField.emitChangedFields(changedFieldsMap);
                this.fileUploadEl.nativeElement.value = '';
                this.uploadedFiles = this.uploadedFiles.filter(uploadedFile => uploadedFile !== fileName);
                if (this.dataField.value.namesPaths) {
                    this.dataField.value.namesPaths = this.dataField.value.namesPaths.filter(namePath => namePath.name !== fileName);
                    this.formControl.setValue(this.dataField.value.namesPaths.map(namePath => {
                        return namePath['name'];
                    }).join('/'));
                    this.dataField.update();
                }
                this.dataField.downloaded = this.dataField.downloaded.filter(one => one !== fileName);
                this._log.debug(`File [${this.dataField.stringId}] ${fileName} was successfully deleted`);
                this.formControl.markAsTouched();
            } else {
                this._log.error(`Deleting file [${this.dataField.stringId}] ${fileName} has failed!`, response.error);
                this._snackbar.openErrorSnackBar(
                    fileName + ' ' + this._translate.instant('dataField.snackBar.fileDeleteFailed')
                );
            }
        });
    }

    protected get defaultState(): FilesState {
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
        if (!!this.dataField && !!this.dataField.placeholder) {
            return this.dataField.placeholder;
        }
        return this._translate.instant('dataField.file.noFile');
    }

    protected parseResponse(): void {
        if (this.dataField.value) {
            if (!!this.dataField.value.namesPaths && this.dataField.value.namesPaths.length !== 0) {
                this.uploadedFiles = new Array<string>();
                this.dataField.value.namesPaths.forEach(namePath => {
                    this.uploadedFiles.push(namePath.name);
                });
            } else {
                this.dataField.value.namesPaths = new Array<FileFieldValue>();
            }
            this.uploadedFiles = this.dataField.value.namesPaths.map(namePath => namePath.name);
        }
    }

    private resolveParentTaskId(): string {
        return !!this.dataField.parentTaskId ? this.dataField.parentTaskId : this.taskId;
    }
}
