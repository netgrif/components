import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileUploadDataModel} from '../../models/file-field';

@Injectable()
export class FileUploadService {

    private _param = 'file';
    private _target = 'https://file.io';
    private _complete = new EventEmitter<string>();

    constructor(private _http: HttpClient,
                private _snackBarService: SnackBarService) {
    }

    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    public uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append(this._param, (file.data as FileUploadDataModel).file);

        const req = new HttpRequest('POST', this._target, fd, {
            reportProgress: true
        });

        file.inProgress = true;
        file.sub = this._http.request(req).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        file.progress = Math.round(event.loaded * 100 / event.total);
                        break;
                    case HttpEventType.Response:
                        return event;
                }
            }),
            tap(message => {
            }),
            last(),
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
