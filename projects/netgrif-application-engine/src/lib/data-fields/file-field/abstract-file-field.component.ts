import {AfterViewInit, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {ProgressType, ProviderProgress} from '../../resources/resource-provider.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {ChangedFieldContainer} from '../../resources/interface/changed-field-container';

export interface FileState {
    progress: number;
    uploading: boolean;
    downloading: boolean;
    completed: boolean;
    error: boolean;
}

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
export abstract class AbstractFileFieldComponent extends AbstractDataFieldComponent implements OnInit, AfterViewInit {
    /**
     * Keep display name.
     */
    public name: string;
    public state: FileState;
    /**
     * Task mongo string id is binding property from parent component.
     */
    @Input() public taskId: string;
    /**
     * Binding property as instance from parent component.
     */
    @Input() public dataField: FileField;
    /**
     * File picker element reference from component template that is initialized after view init.
     */
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;
    /**
     * Image field view element reference from component template that is initialized after view init.
     */
    @ViewChild('imageEl') public imageEl: ElementRef<HTMLImageElement>;

    /**
     * Only inject services.
     * @param _taskResourceService Provides to download a file from the backend
     * @param _log Logger service
     * @param _snackbar Snackbar service to notify user
     * @param _translate Translate service for I18N
     */
    protected constructor(protected _taskResourceService: TaskResourceService,
                          protected _log: LoggerService,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService) {
        super();
        this.state = this.defaultState;
    }

    /**
     * Set :
     *  - File field to [FileFieldService]{@link FileFieldService}
     *  - Display name
     */
    ngOnInit() {
        super.ngOnInit();
        this.name = this.constructDisplayName();
    }

    /**
     * Set file picker and image elements to [FileFieldService]{@link FileFieldService}.
     *
     * Initialize file image.
     */
    ngAfterViewInit(): void {
        if (this.fileUploadEl) {
            this.fileUploadEl.nativeElement.onchange = () => this.upload();
        }
        this.initFileFieldImage();
    }

    public chooseFile() {
        if (this.state.uploading) {
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
            return;
        }
        if (this.dataField.maxUploadSizeInBytes &&
            this.dataField.maxUploadSizeInBytes < this.fileUploadEl.nativeElement.files.item(0).size) {
            this._log.error('File cannot be uploaded. Maximum size of file exceeded.');
            this._snackbar.openErrorSnackBar(
                this._translate.instant('dataField.snackBar.maxFilesSizeExceeded') + this.dataField.maxUploadSizeInBytes
            );
        }

        this.state = this.defaultState;
        this.state.uploading = true;
        const fileFormData = new FormData();
        fileFormData.append('file', this.fileUploadEl.nativeElement.files.item(0) as File);
        this.dataField.value.name = this.fileUploadEl.nativeElement.files.item(0).name;
        this.name = this.constructDisplayName();
        this._taskResourceService.uploadFile(this.taskId, this.dataField.stringId, fileFormData, false).subscribe(response => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                this.state.progress = (response as ProviderProgress).progress;
            } else {
                this.dataField.emitChangedFields(response as ChangedFieldContainer);
                this._log.debug(
                    `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0).name} was successfully uploaded`
                );
                this.state.completed = true;
                this.state.error = false;
                this.state.uploading = false;
                this.state.progress = 0;
                this.dataField.downloaded = false;
            }
        }, error => {
            this.state.completed = true;
            this.state.error = true;
            this.state.uploading = false;
            this.state.progress = 0;
            this._log.error(
                `File [${this.dataField.stringId}] ${this.fileUploadEl.nativeElement.files.item(0)} uploading has failed!`, error
            );
            this._snackbar.openErrorSnackBar(this._translate.instant('dataField.snackBar.fileUploadFailed'));
        });
    }

    public download() {
        if (!this.dataField.value || !this.dataField.value.name) {
            return;
        }
        if (!this.taskId) {
            this._log.error('File cannot be downloaded. No task is set to the field.');
            return;
        }

        this.state = this.defaultState;
        this.state.downloading = true;
        this._taskResourceService.downloadFile(this.taskId, this.dataField.stringId).subscribe(response => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.DOWNLOAD) {
                this.state.progress = (response as ProviderProgress).progress;
            } else {
                this._log.debug(`File [${this.dataField.stringId}] ${this.dataField.value.name} was successfully downloaded`);
                this.downloadViaAnchor(response as Blob);
                this.state.downloading = false;
                this.state.progress = 0;
                this.dataField.downloaded = true;
            }
        }, error => {
            this._log.error(`Downloading file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, error);
            this._snackbar.openErrorSnackBar(this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.downloadFail'));
            this.state.downloading = false;
            this.state.progress = 0;
        });
    }

    protected downloadViaAnchor(blob: Blob): void {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        blob = new Blob([blob], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
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

        this._taskResourceService.deleteFile(this.taskId, this.dataField.stringId).subscribe(response => {
            if (response.success) {
                this.dataField.value = {};
                this.name = this.constructDisplayName();
                this.dataField.downloaded = false;
                this._log.debug(`File [${this.dataField.stringId}] ${this.dataField.value.name} was successfully deleted`);
            } else {
                this._log.error(`Downloading file [${this.dataField.stringId}] ${this.dataField.value.name} has failed!`, response.error);
                this._snackbar.openErrorSnackBar(
                    this.dataField.value.name + ' ' + this._translate.instant('dataField.snackBar.fileDeleteFailed')
                );
            }
        });
    }

    isEmpty() {
        return !this.dataField || !this.dataField.value || JSON.stringify(this.dataField.value) === '{}';
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
    protected constructDisplayName(): string {
        return this.dataField.value && this.dataField.value.name ? this.dataField.value.name :
            (this.dataField.placeholder ? this.dataField.placeholder : this._translate.instant('dataField.file.noFile'));
    }

    /**
     * Initialize file field image from backend if it is image type.
     */
    protected initFileFieldImage() {
        // this._taskResourceService.downloadFile(this.taskId, this.dataField.stringId)
        //     .subscribe(fileBlob => {
        //         const file: File = new File([fileBlob], this.name);
        //         if (!file.type.includes('image')) {
        //             return;
        //         }
        //         this._fileFieldService.allFiles = [];
        //         this._fileFieldService.allFiles.push(this._fileFieldService.createFileUploadModel(file, true));
        //
        //         // TODO: 11.4.2020 unify image element assignment URL
        //         //  for blob or file type as arguments to setImageSourceUrl function in FileFieldService
        //         //  this._fileFieldService.setImageSourceUrl(fileBlob)
        //         const reader = new FileReader();
        //         reader.readAsDataURL(fileBlob);
        //         reader.onloadend = () => {
        //             if (typeof reader.result === 'string') {
        //                 this.imageEl.nativeElement.src = reader.result;
        //                 this.imageEl.nativeElement.alt = this.name;
        //             }
        //         };
        //     });
    }

}

