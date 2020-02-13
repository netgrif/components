import {EventEmitter, Injectable} from '@angular/core';
import {FileUploadModel} from "./file-field";
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from "@angular/common/http";
import {catchError, last, map, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class FileUploadService {

    private _param = 'file';
    private _target = 'https://file.io';
    private _complete = new EventEmitter<string>();

    constructor(private _http: HttpClient) {
    }

    public uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append(this._param, file.data.file);

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
            catchError((error: HttpErrorResponse) => {
                file.inProgress = false;
                file.canRetry = true;
                return of(`${file.data.name} upload failed.`);
            })
        ).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                    // this.removeFileFromArray(file);
                    file.successfullyUploaded = true;
                    //TODO: snackbar success upload info
                    this._complete.emit(event.body);
                }
            }
        );

    }
}
