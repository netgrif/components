import {EventEmitter, Injectable} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileUploadDataModel} from '../../models/file-field';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../../../logger/services/logger.service';

@Injectable()
export class FileUploadService {

    public taskId: string;

    private _complete = new EventEmitter<string>();

    constructor(private _taskResource: TaskResourceService,
                private _logger: LoggerService,
                private _snackBarService: SnackBarService) {
    }

    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    /**
     * Upload file as FileUploadModel instance to backend endpoint '/task/taskId/file/fileId' via TaskResourceService
     * fileUploadModel
     */
    public uploadFile(fileUploadModel: FileUploadModel) {
        const fd = new FormData();
        const file = (fileUploadModel.data as FileUploadDataModel).file;
        fd.append('file', file);

        fileUploadModel.inProgress = true;
        fileUploadModel.sub = this._taskResource.uploadFile(this.taskId, fileUploadModel.stringId, fd)
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
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                    return of(`${file.name} upload failed.`);
                })
            ).subscribe(
                (event: any) => {
                    if (typeof (event) === 'object') {
                        fileUploadModel.successfullyUploaded = true;
                        this._logger.info(file.name + ' has been successfully uploaded');
                        this._snackBarService.openInfoSnackBar(file.name + ' upload successful',
                            SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                        this._complete.emit(event.body);
                    }
                }
            );
    }
}
