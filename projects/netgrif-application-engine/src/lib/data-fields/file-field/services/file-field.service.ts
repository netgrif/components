import {ElementRef, Injectable} from '@angular/core';
import * as JSZip from 'jszip';
import {FileField, FileUploadDataModel} from '../models/file-field';
import {FileUploadService} from './upload/file-upload.service';
import {FileDownloadService} from './download/file-download.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../snack-bar/services/snack-bar.service';
import {FileUploadModel} from '../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FilesUploadComponent} from '../../../side-menu/content-components/files-upload/files-upload.component';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';

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
     * @param _fileDownloadService Provides download file from backend
     * @param _sideMenuService Open right side menu
     * @param _snackBarService Notify user about exceeded validations
     */
    constructor(private _fileUploadService: FileUploadService,
                private _fileDownloadService: FileDownloadService,
                private _sideMenuService: SideMenuService,
                private _snackBarService: SnackBarService) {
        this._fileUploadService.fileUploadCompleted.subscribe(() => {
            this.fileField.value = this.resolveFilesArray();
        });
    }

    /**
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
     */
    public retryFile(file: FileUploadModel) {
        file.canRetry = false;
        file.successfullyUploaded = false;
        this._fileUploadService.uploadFile(file);
    }

    /**
     * Check if file is successfully uploaded and then download it.
     * @param file Selected file for download
     */
    public onFileDownload(file: FileUploadModel) {
        if (!file.successfullyUploaded) {
            return;
        }
        this._fileDownloadService.downloadFile(file);
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
            this.fileField.value = this.resolveFilesArray();
        }
    }

    /**
     * Add choose file or files from file picker to addFiles after all validations.
     *
     * Open side menu if it is closed.
     *
     * Set file field image source url if select file is image and is the only one in addFiles.
     */
    public fileUpload() {
        this.fileUploadEl.nativeElement.onchange = () => {
            if ((this.allFiles.length + this.fileUploadEl.nativeElement.files.length) > this.fileField.maxUploadFiles) {
                this._snackBarService.openWarningSnackBar('You choose more files as you allowed',
                    SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
                return;
            }
            Array.from(this.fileUploadEl.nativeElement.files).forEach(file => {
                const fileUploadModel = this.createFileUploadModel(file);
                if (this.allFiles.find(
                    f => (f.data as FileUploadDataModel).file.name === (fileUploadModel.data as FileUploadDataModel).file.name)) {
                    this._snackBarService.openWarningSnackBar('You cannot upload two of the same files',
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
                    return;
                }
                if (this.maxUploadSizeControl(fileUploadModel)) {
                    return;
                }

                this.allFiles.push(fileUploadModel);
                // One by one upload file
                if (!this.fileField.zipped) {
                    this._fileUploadService.uploadFile(fileUploadModel);
                }
                if (file.type.includes('image') && this.allFiles.length === 1) {
                    this.setImageSourceUrl(file);
                }
            });
            this.fileUploadEl.nativeElement.value = '';
            if (!this._sideMenuService.isOpened()) {
                this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this);
            }
        };
        this.fileUploadEl.nativeElement.click();
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
            state: 'in', downloading: false,
            inProgress: false, progress: isSuccessfullyUploaded ? 100 : 0,
            canRetry: false, canCancel: true,
            successfullyUploaded: isSuccessfullyUploaded
        };
    }

    /**
     * Control max upload size validation set in Petri Net.
     */
    private maxUploadSizeControl(file: FileUploadModel): boolean {
        this.fileField.filesSize += (file.data as FileUploadDataModel).file.size;
        if (this.fileField.filesSize > this.fileField.maxUploadSizeInBytes) {
            this._snackBarService.openWarningSnackBar('Files size exceeded allowed limit',
                SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2);
            return true;
        }
        return false;
    }

    /**
     * Returns successfully uploaded files as File.
     */
    private resolveFilesArray(): Array<File> {
        return this.allFiles.filter(f => f.successfullyUploaded).map(f => (f.data as FileUploadDataModel).file);
    }

}
