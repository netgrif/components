import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {catchError, last, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {FileUploadModel} from '../files-upload/models/file-upload-model';
import {FormControl} from '@angular/forms';
import {SideMenuControl} from '../../models/side-menu-control';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {MessageResource} from '../../../resources/interface/message-resource';

interface FileList {
    [key: string]: FileUploadModel;
}

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
export class ImportNetComponent implements OnInit, AfterViewInit {

    public files: FileList = {};
    public releaseTypes: string[] = ['Major', 'Minor', 'Patch'];
    public releaseTypeControl = new FormControl(this.releaseTypes[0]);

    private _fileInput: HTMLInputElement;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _petriNetResource: PetriNetResourceService,
                private _log: LoggerService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this._fileInput = document.getElementById('sidemenu-fileUpload') as HTMLInputElement;
        this._fileInput.onchange = () => {
            for (const fileIndex of Array.from(Array(this._fileInput.files.length).keys())) {
                const file = this._fileInput.files[fileIndex];
                if (this.files[file.name]) {
                    const knownFile = this.files[file.name].data as File;
                    if (knownFile.type !== file.type || knownFile.lastModified !== file.lastModified) {
                        this.files[file.name] = this.setupFile(file);
                    }
                } else {
                    this.files[file.name] = this.setupFile(file);
                }
            }
            this.uploadFiles();
        };
    }

    get fileList(): Array<FileUploadModel> {
        return Object.values(this.files);
    }

    get isAllFinished(): boolean {
        return Object.values(this.files).every(file => !file.inProgress && file.progress === 100);
    }

    public onProcessFileChosen() {
        if (this._fileInput) {
            this._fileInput.click();
        }
    }

    public cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFile(file);
    }

    public retryFile(file: FileUploadModel) {
        this.uploadFile(file);
        file.canRetry = false;
    }

    public close(): void {
        this._sideMenuControl.close({
            opened: false,
            message: 'All process files were processed',
            data: this.fileList
        });
    }

    private setupFile(file: File): FileUploadModel {
        return {
            data: file, state: 'in', stringId: '', downloading: false,
            inProgress: false, progress: 0, canRetry: false, canCancel: true, successfullyUploaded: false
        };
    }

    private uploadFiles() {
        this._fileInput.value = '';

        this.fileList.filter(fileModel => !fileModel.successfullyUploaded && fileModel.progress === 0).forEach(file => {
            this.uploadFile(file);
        });
    }

    private removeFile(file: FileUploadModel) {
        if (this.files[file.data.name]) {
            delete this.files[file.data.name];
            this._sideMenuControl.publish({
                opened: true,
                message: 'Process ' + file.data.name + ' was deleted from the list',
                data: file
            });
        }
    }

    private uploadFile(file: FileUploadModel) {
        const fileFormData = new FormData();
        fileFormData.append('file', file.data as File);
        fileFormData.append('meta', JSON.stringify({releaseType: this.releaseTypeControl.value.toString().toUpperCase()}));

        file.inProgress = true;
        file.sub = this._petriNetResource.importPetriNet(fileFormData).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        file.progress = Math.round(event.loaded * 100 / event.total);
                        break;
                    case HttpEventType.Response:
                        return event;
                    default:
                        return event;
                }
            }),
            last(),
            catchError((error: HttpErrorResponse) => {
                file.inProgress = false;
                file.canRetry = true;
                return of(`${file.data.name} upload failed.`);
            })
        ).subscribe(
            (event: HttpEvent<MessageResource>) => {
                if (event.type === HttpEventType.Response) {
                    const response = event.body;
                    file.inProgress = false;
                    if (response.success || !response.error) {
                        file.successfullyUploaded = true;
                    }
                    if (response.error) {
                        file.successfullyUploaded = false;
                        this._log.error('Importing process file has failed!', response.error);
                    }
                    this._sideMenuControl.publish({
                        opened: true,
                        message: 'Process ' + file.data.name + ' successfully uploaded',
                        data: file
                    });
                }
            }
        );
    }

}
