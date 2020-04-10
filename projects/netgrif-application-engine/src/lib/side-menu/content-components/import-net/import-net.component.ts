import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FileUploadModel} from '../files-upload/models/file-upload-model';
import {FormControl} from '@angular/forms';
import {SideMenuControl} from '../../models/side-menu-control';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';

@Component({
    selector: 'nae-import-net',
    templateUrl: './import-net.component.html',
    styleUrls: ['./import-net.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 100})),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ]
})
export class ImportNetComponent implements OnInit {
    /** Name used in form which will be sent in HTTP request. */
    @Input() param = 'file';
    /** Target URL for file uploading. */
    @Input() target;
    /** File extension that accepted, same as 'accept' of <input type="file" />. */
    @Input() accept = 'text/xml';
    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output() $complete = new EventEmitter<string>();

    public files: Array<FileUploadModel> = [];
    public releaseTypes: string[] = ['Major', 'Minor', 'Patch'];
    public releaseTypeControl = new FormControl(this.releaseTypes[0]);

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl, private _http: HttpClient) {
    }

    ngOnInit() {
    }

    public onFileUpload() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            // tslint:disable-next-line:prefer-for-of
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({
                    stringId: 'petriNetId',
                    data: file, state: 'in',
                    inProgress: false, progress: 0, canRetry: false, canCancel: true, successfullyUploaded: false
                });
            }
            this.uploadFiles();
        };
        fileUpload.click();
    }

    public cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    public retryFile(file: FileUploadModel) {
        this.uploadFile(file);
        file.canRetry = false;
    }

    public close(): void {
        this._sideMenuControl.close({
            opened: false,
            message: 'Net was uploaded'
        });
    }

    private uploadFile(file: FileUploadModel) {
        const fd = new FormData();
        fd.append(this.param, file.data as File);

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
                    this.removeFileFromArray(file);
                    this.$complete.emit(event.body);
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
