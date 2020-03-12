import {ElementRef, Injectable} from '@angular/core';
import {FileField, FileUploadModel} from "../models/file-field";
import {SideMenuService, SideMenuWidth} from "../../../side-menu/services/side-menu.service";
import {FileUploadService} from "./upload/file-upload.service";
import {FilesUploadComponent} from "../../../side-menu/files-upload/files-upload.component";
import {FileDownloadService} from "./download/file-download.service";
import * as JSZip from 'jszip';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from "../../../snack-bar/snack-bar.service";

@Injectable({
    providedIn: 'root'
})
export class FileFieldService {

    public allFiles: Array<FileUploadModel> = [];
    public fileUploadEl: ElementRef<HTMLInputElement>;
    public fileField: FileField;

    constructor(private _fileUploadService: FileUploadService,
                private _fileDownloadService: FileDownloadService,
                private _sideMenuService: SideMenuService,
                private _snackBarService: SnackBarService) {
    }

    public onFileUpload(firstOpen: boolean) {
        if (firstOpen && this.allFiles.length !== 0) {
            this._sideMenuService.open(FilesUploadComponent, SideMenuWidth.LARGE);
        } else {
            this.fileUpload(firstOpen);
        }
    }

    public onSend() {
        // ZIPPING
        let zip = new JSZip();
        this.allFiles.forEach(file => {
            zip.folder('fileFieldZipFolder').file(file.data.file.name);
        });
        this._fileUploadService.uploadFile(zip.files);
        this._sideMenuService.close();
    }

    public cancelFile(file: FileUploadModel) {
        // file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    public retryFile(file: FileUploadModel) {
        file.canRetry = false;
        file.successfullyUploaded = false;
        this._fileUploadService.uploadFile(file)
    }

    public onFileDownload(file: FileUploadModel) {
        if (!file.successfullyUploaded)
            return;
        this._fileDownloadService.downloadFile(file);
    }

    private removeFileFromArray(file: FileUploadModel) {
        const index = this.allFiles.indexOf(file);
        if (index > -1) {
            this.allFiles.splice(index, 1);
        }
    }

    private fileUpload(firstOpen: boolean) {
        this.fileUploadEl.nativeElement.onchange = () => {
            if ((this.allFiles.length + this.fileUploadEl.nativeElement.files.length) > this.fileField.maxUploadFiles) {
                this._snackBarService.openWarningSnackBar('You choose more files as you allowed', SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2000);
                return;
            }
            Array.from(this.fileUploadEl.nativeElement.files).forEach(file => {
                const fileUploadModel = {
                    data: {
                        file: file,
                        name: file.name.substr(0, file.name.lastIndexOf('.')),
                        extension: file.name.substr(file.name.lastIndexOf('.') + 1)
                    },
                    state: 'in',
                    inProgress: false, progress: 0,
                    canRetry: false, canCancel: true,
                    successfullyUploaded: false
                };
                if (this.allFiles.find(file => file.data.file.name === fileUploadModel.data.file.name)) {
                    this._snackBarService.openWarningSnackBar('You cannot upload two of the same files', SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2000);
                    return;
                }
                if (this.maxUploadSizeControl(fileUploadModel)) return;

                this.allFiles.push(fileUploadModel);
                // One by one upload file
                if (!this.fileField.zipped) {
                    this._fileUploadService.uploadFile(fileUploadModel)
                }
            });

            this.fileUploadEl.nativeElement.value = '';
            if (firstOpen) {
                this._sideMenuService.open(FilesUploadComponent, SideMenuWidth.LARGE);
            }
        };

        this.fileUploadEl.nativeElement.click();
    }

    private maxUploadSizeControl(file: FileUploadModel) {
        this.fileField.filesSize += file.data.file.size;
        if (this.fileField.filesSize > this.fileField.maxUploadSizeInBytes) {
            this._snackBarService.openWarningSnackBar('Files size exceeded allowed limit', SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 2000);
            return true;
        }
        return false;
    }
}
