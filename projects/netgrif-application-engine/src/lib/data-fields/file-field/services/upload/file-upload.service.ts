import {EventEmitter, Injectable} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileUploadDataModel} from '../../models/file-field';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';

@Injectable()
export class FileUploadService {

    public taskId: string;

    private _complete = new EventEmitter<string>();

    constructor(private _taskResource: TaskResourceService,
                private _snackBarService: SnackBarService) {
    }

    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    public uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append('file', (file.data as FileUploadDataModel).file);

        file.inProgress = true;
        file.sub = this._taskResource.uploadFile('5e90b517ade75e1830b07c83', 'cv_file', fd).pipe(
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
