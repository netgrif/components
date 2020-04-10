import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../../snack-bar/snack-bar.service';
import {FileUploadModel} from '../../../../side-menu/content-components/files-upload/models/file-upload-model';
import {FileField, FileUploadDataModel} from '../../models/file-field';
import {getResourceAddress} from '../../../../resources/resource-utility-functions';
import {ConfigurationService} from '../../../../configuration/configuration.service';

@Injectable()
export class FileUploadService {

    public taskId: string;

    private readonly SERVER_URL: string;
    private _complete = new EventEmitter<string>();

    constructor(private _http: HttpClient,
                private _configService: ConfigurationService,
                private _snackBarService: SnackBarService) {
        this.SERVER_URL = getResourceAddress('task', this._configService.get().providers.resources);
    }

    public get fileUploadCompleted(): Observable<string> {
        return this._complete.asObservable();
    }

    public uploadFile(file: FileUploadModel, fileField: FileField) {
        const fd = new FormData();
        fd.append('file', (file.data as FileUploadDataModel).file);

        const req = new HttpRequest('POST', this.SERVER_URL + 'task/' + '5e903494ade75e286440793a' + '/file/' + 'cv_file', fd, {
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
