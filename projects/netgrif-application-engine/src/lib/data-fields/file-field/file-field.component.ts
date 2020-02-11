import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileField} from "./file-field";
import {FormControl} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {catchError, last, map, tap} from "rxjs/operators";
import {of, Subscription} from "rxjs";

interface FileUploadModel {
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    successfullyUploaded: boolean,
    sub?: Subscription;
}

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({ opacity: 100 })),
            transition('* => void', [
                animate(300, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class FileFieldComponent implements OnInit {

    @Input() public fileField: FileField;
    /** Name used in form which will be sent in HTTP request. */
    @Input() param = 'file';
    /** Target URL for file uploading. */
    @Input() target = 'https://file.io';
    /** File extension that accepted, same as 'accept' of <input type="file" />.
     By the default, it's set to 'image/*'. */
    @Input() accept = 'image/*';
    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output() complete = new EventEmitter<string>();

    public files: Array<FileUploadModel> = [];

    constructor(private _http: HttpClient) { }

    ngOnInit() {
    }

    onFileUpload() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({ data: file, state: 'in',
                    inProgress: false, progress: 0, canRetry: false, canCancel: true, successfullyUploaded: false });
            }
            this.uploadFiles();
        };
        fileUpload.click();
    }

    cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    retryFile(file: FileUploadModel) {
        this.uploadFile(file);
        file.canRetry = false;
        file.successfullyUploaded = false;
    }

    downloadFile(file : FileUploadModel) {
        if (!file.successfullyUploaded)
            return;
        //TODO: download file
    }

    private uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append(this.param, file.data);

        const req = new HttpRequest('POST', this.target, fd, {
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
            tap(message => { }),
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
                    this.complete.emit(event.body);
                }
            }
        );
    }

    private uploadFiles() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.value = '';

        this.files.forEach(file => {
            this.uploadFile(file);
        });
    }

    private removeFileFromArray(file: FileUploadModel) {
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    }

}

