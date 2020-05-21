import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FileUploadModel} from '../files-upload/models/file-upload-model';
import {FormControl} from '@angular/forms';
import {SideMenuControl} from '../../models/side-menu-control';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {MessageResource} from '../../../resources/interface/message-resource';
import {ProgressType, ProviderProgress} from '../../../resources/resource-provider.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';

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
                private _log: LoggerService,
                private _snackbar: SnackBarService) {
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
            data: file, stringId: '', downloading: false, inProgress: false, progress: 0, completed: false, uploaded: false
        };
    }

    private uploadFiles() {
        this._fileInput.value = '';

        this.fileList.filter(fileModel => !fileModel.completed && fileModel.progress === 0).forEach(file => {
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
        fileFormData.append('meta', this.releaseTypeControl.value.toString().toUpperCase());

        file.inProgress = true;
        file.completed = false;
        file.error = false;
        file.sub = this._petriNetResource.importPetriNet(fileFormData).subscribe(response => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                file.progress = (response as ProviderProgress).progress;
                if (file.progress === 100) {
                    file.uploaded = true;
                }
            } else {
                this._log.info((response as MessageResource).success);
                file.inProgress = false;
                file.completed = true;
                this._sideMenuControl.publish({
                    opened: true,
                    message: 'Process ' + file.data.name + ' successfully uploaded',
                    data: file
                });
            }
        }, error => {
            file.inProgress = false;
            file.completed = false;
            file.error = true;
            this._log.error('Importing process file has failed!', error);
            this._snackbar.openErrorSnackBar('Uploading process file has failed');
        });
    }

}
