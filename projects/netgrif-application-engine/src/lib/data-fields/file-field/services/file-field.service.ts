import {ElementRef, Injectable} from '@angular/core';
import * as JSZip from 'jszip';
import {FileField, FileUploadDataModel} from '../models/file-field';
import {FileUploadService} from './upload/file-upload.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {FileUploadModel} from '../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FilesUploadComponent} from '../../../side-menu/content-components/files-upload/files-upload.component';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../translate/language.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {ProgressType, ProviderProgress} from '../../../resources/resource-provider.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {SnackBarHorizontalPosition, SnackBarVerticalPosition} from '../../../snack-bar/models/snack-bar-enums';

/**
 * Links communication between
 * [FileFieldComponent]{@link FileFieldComponent} and [FilesUploadComponent]{@link FilesUploadComponent}.
 */
@Injectable()
export class FileFieldService {
    /**
     * Array all choose files in file field.
     */
    public allFiles: Array<FileUploadModel> = [];
    /**
     * Reference to file upload input element.
     *
     * Represent hidden file picker.
     */
    public fileUploadEl: ElementRef<HTMLInputElement>;
    /**
     * Reference to image element
     * which must be set from [FileFieldComponent]{@link FileFieldComponent}.
     */
    public imageEl: ElementRef<HTMLImageElement>;
    /**
     * Holds all information from a Petri Net.
     */
    public fileField: FileField;

    /**
     * After complete file upload set value for file field.
     * @param _fileUploadService Provides upload file to backend
     * @param _sideMenuService Open right side menu
     * @param _snackBarService Notify user about exceeded validations
     * @param _translate for translations
     * @param _lang Initialize languages
     * @param _taskResourceService Provides upload and download file
     * @param _log Log error of file upload
     */
    constructor(private _fileUploadService: FileUploadService,
                private _sideMenuService: SideMenuService,
                private _snackBarService: SnackBarService,
                private _translate: TranslateService,
                private _lang: LanguageService,
                private _taskResourceService: TaskResourceService,
                private _log: LoggerService) {
        this._fileUploadService.fileUploadCompleted.subscribe(() => {
            // this.fileField.value = this.resolveFilesArray();
        });
    }

    /**
     * ZIP files are not used anymore
     * All select files after click send zipped to backend on send button.
     */
    public onSend() {
        const zip = new JSZip();
        this.allFiles.forEach(file => {
            zip.folder('fileFieldZipFolder').file((file.data as FileUploadDataModel).file.name);
        });
        this._fileUploadService.uploadFile(zip.files);
        this._sideMenuService.close();
    }

    /**
     * Remove file from uploaded files in file field.
     * @param file Selected file for remove
     */
    public cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    /**
     * Retry upload file to backend and reset
     * [FileUploadModel]{@link FileUploadModel} upload properties.
     * @param file Selected file for re-upload
     * @param taskId Task string id
     */
    public retryFile(file: FileUploadModel, taskId: string) {
        file.completed = false;
        this.uploadOneFile(file, taskId);
    }

    /**
     * Check if file is successfully uploaded and then download it.
     * @param file Selected file for download
     * @param taskId Task string id
     */
    public onFileDownload(file: FileUploadModel, taskId: string) {
        if (!file.completed || !taskId) {
            return;
        }
        this._taskResourceService.downloadFile(taskId, file.stringId).subscribe(data => {
            if (data instanceof Blob) {
                const blob = new Blob([data], {type: 'application/octet-stream'});
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        });
    }

    public setImageSourceUrl(file: File | Blob): void {
        // TODO: 11.4.2020 unify image element assignment URL
        //  in initFileFieldImage function in FileFieldComponent
        const reader = new FileReader();
        if (file instanceof File) {
            this.imageEl.nativeElement.src = URL.createObjectURL(file);
        } else if (file instanceof Blob) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                this.imageEl.nativeElement.src = reader.result;
            }
        };
        this.imageEl.nativeElement.alt = this.fileField.value ? this.fileField.value[0].name : '';
    }

    /**
     * Remove file from allFiles array.
     * @param file Selected file for remove
     */
    private removeFileFromArray(file: FileUploadModel) {
        const index = this.allFiles.indexOf(file);
        if (index > -1) {
            this.allFiles.splice(index, 1);
            // this.fileField.value = this.resolveFilesArray();
        }
    }

    /**
     * Add choose file or files from file picker to addFiles after all validations.
     *
     * Open side menu if it is closed.
     *
     * Set file field image source url if select file is image and is the only one in addFiles.
     * @param taskId Task string id
     */
    public fileUpload(taskId: string) {
        this.fileUploadEl.nativeElement.onchange = () => {
            if ((this.allFiles.length + this.fileUploadEl.nativeElement.files.length) > this.fileField.maxUploadFiles) {
                this._snackBarService.openWarningSnackBar(this._translate.instant('dataField.snackBar.moreFiles'),
                    SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
                return;
            }
            Array.from(this.fileUploadEl.nativeElement.files).forEach(file => {
                const fileUploadModel = this.createFileUploadModel(file);
                if (this.allFiles.find(
                    f => (f.data as FileUploadDataModel).file.name === (fileUploadModel.data as FileUploadDataModel).file.name)) {
                    this._snackBarService.openWarningSnackBar(this._translate.instant('dataField.snackBar.sameFiles'),
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
                    return;
                } else {
                    this.allFiles.push(fileUploadModel);
                }

                this.uploadOneFile(fileUploadModel, taskId);

                // not existing imageRef
                // if (file.type.includes('image') && this.allFiles.length === 1) {
                //     this.setImageSourceUrl(file);
                // }
            });
            this.fileUploadEl.nativeElement.value = '';
            if (!this._sideMenuService.isOpened()) {
                this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this);
            }
        };
        this.fileUploadEl.nativeElement.click();
    }

    /**
     * Uploads one file on backend
     * @param fileUploadModel Selected file for upload
     * @param taskId Task string id
     */
    private uploadOneFile(fileUploadModel: FileUploadModel, taskId: string) {
        if (this.maxUploadSizeControl(fileUploadModel) || !taskId) {
            return;
        }

        if (!this.fileField.zipped) {
            const fileFormData = new FormData();
            fileFormData.append('file', (fileUploadModel.data as FileUploadDataModel).file as File);

            fileUploadModel.inProgress = true;
            fileUploadModel.completed = false;
            fileUploadModel.error = false;
            fileUploadModel.sub = this._taskResourceService.uploadFile(taskId,
                fileUploadModel.stringId, fileFormData, false).subscribe(response => {
                if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                    fileUploadModel.progress = (response as ProviderProgress).progress;
                    if (fileUploadModel.progress === 100) {
                        fileUploadModel.uploaded = true;
                    }
                } else {
                    fileUploadModel.inProgress = false;
                    fileUploadModel.completed = true;

                }
            }, error => {
                fileUploadModel.inProgress = false;
                fileUploadModel.completed = false;
                fileUploadModel.error = true;
                this._log.error('File uploading has failed!', error);
                this._snackBarService.openErrorSnackBar('Uploading file has failed');
            });
        }
    }

    /**
     * Create [FileUploadModel]{@link FileUploadModel} object
     * based on whether the file is already uploaded or new.
     * @returns FileUploadModel
     */
    public createFileUploadModel(file: File, isSuccessfullyUploaded = false): FileUploadModel {
        return {
            stringId: this.fileField.stringId,
            data: {
                file,
                name: file.name.substr(0, file.name.lastIndexOf('.')),
                extension: file.name.substr(file.name.lastIndexOf('.') + 1)
            },
            downloading: false,
            inProgress: false, progress: isSuccessfullyUploaded ? 100 : 0,
            completed: isSuccessfullyUploaded
        };
    }

    /**
     * Control max upload size validation set in Petri Net.
     */
    private maxUploadSizeControl(file: FileUploadModel): boolean {
        this.fileField.filesSize += (file.data as FileUploadDataModel).file.size;
        if (this.fileField.filesSize > this.fileField.maxUploadSizeInBytes) {
            this._snackBarService.openWarningSnackBar(this._translate.instant('dataField.snackBar.fileSize'),
                SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
            return true;
        }
        return false;
    }

    /**
     * Returns successfully uploaded files as File.
     */
    private resolveFilesArray(): Array<File> {
        return this.allFiles.filter(f => f.completed).map(f => (f.data as FileUploadDataModel).file);
    }

}
