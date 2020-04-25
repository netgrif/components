import {EventEmitter, Injectable} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/services/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileUploadDataModel} from '../../models/file-field';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../../../logger/services/logger.service';

/**
 * Provides to upload a file to the backend and set some
 * [FileUploadModel]{@link FileUploadModel} upload properties for this file.
 */
@Injectable()
export class FileUploadService {
    /**
     * Task mongo string id:
     *  - is used for set correct file with file string id to backend
     *  - must be set before uploading
     */
    public taskId: string;

    private _complete = new EventEmitter<string>();

    /**
     * Only injected services.
     * @param _taskResourceService Provides to upload a file to the backend
     * @param _snackBarService Used for notify user about ratio upload file
     * @param _logger Log result of ratio upload file
     */
    constructor(private _taskResourceService: TaskResourceService,
                private _logger: LoggerService,
                private _snackBarService: SnackBarService) {
    }

    /**
     * Returns information about completed file upload as stream.
     */
    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    /**
     * Upload file as FileUploadModel instance to backend endpoint '/task/taskId/file/fileId' via TaskResourceService.
     *  - Notify user of a successful upload
     *  - Log info
     *  - Upload file
     *  - Calculate size of upload progress bar
     *  - Catch errors
     *  @param fileUploadModel Selected file to upload
     */
    public uploadFile(fileUploadModel: FileUploadModel) {
        const file = (fileUploadModel.data as FileUploadDataModel).file;
        const fd = new FormData();
        fd.append('file', file);

        fileUploadModel.inProgress = true;
        fileUploadModel.sub = this._taskResourceService.uploadFile(this.taskId, fileUploadModel.stringId, fd)
            .pipe(
                map(event => {
                    switch (event.type) {
                        case HttpEventType.UploadProgress:
                            fileUploadModel.progress = Math.round(event.loaded * 100 / event.total);
                            break;
                        case HttpEventType.Response:
                            return event;
                    }
                }),
                catchError((error) => {
                    fileUploadModel.inProgress = false;
                    fileUploadModel.canRetry = true;
                    this._logger.error(file.name + 'upload failed: ' + error);
                    this._snackBarService.openErrorSnackBar(file.name + ' upload failed',
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1);
                    return of(`${file.name} upload failed.`);
                })
            ).subscribe(
                (event: any) => {
                    if (typeof (event) === 'object') {
                        fileUploadModel.successfullyUploaded = true;
                        fileUploadModel.state = undefined;
                        this._logger.info(file.name + ' has been successfully uploaded');
                        this._snackBarService.openGenericSnackBar(file.name + ' upload successful', 'library_add_check',
                            SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1);
                        this._complete.emit(event.body);
                    }
                }
            );
    }
}
