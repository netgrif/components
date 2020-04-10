import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileField, FileUploadDataModel} from '../../models/file-field';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';

@Injectable()
export class FileUploadService {

    public taskId = '5e8f9c3275096024c842f585';
    public fileId = 'file';

    private _complete = new EventEmitter<string>();

    constructor(private _taskResource: TaskResourceService,
                private _configService: ConfigurationService,
                private _snackBarService: SnackBarService) {
    }

    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    public uploadFile(file: FileUploadModel, fileField: FileField) {
        const fd = new FormData();
        fd.append('file', (file.data as FileUploadDataModel).file);

        file.inProgress = true;
        file.sub = this._taskResource.uploadFile(this.taskId, this.fileId, fd).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        file.progress = Math.round(event.loaded * 100 / event.total);
                        break;
                    case HttpEventType.Response:
                        return event;
                }
            }),
            catchError((error) => {
                file.inProgress = false;
                file.canRetry = true;
                console.log(error);
                this._snackBarService.openErrorSnackBar((file.data as FileUploadDataModel).file.name + ' upload failed',
                    SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                return of(`${file.data.name} upload failed.`);
            })
        ).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                    file.successfullyUploaded = true;
                    this._snackBarService.openInfoSnackBar((file.data as FileUploadDataModel).file.name + ' upload successful',
                        SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 1000);
                    this._complete.emit(event.body);
                }
            }
        );

    }
}
