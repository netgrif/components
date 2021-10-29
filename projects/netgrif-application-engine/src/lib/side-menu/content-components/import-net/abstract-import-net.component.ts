import {AfterViewInit, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SideMenuControl} from '../../models/side-menu-control';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {PetriNetMessageResource} from '../../../resources/interface/message-resource';
import {ProgressType, ProviderProgress} from '../../../resources/resource-provider.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {FileUploadDataModel} from '../../../data-fields/file-field/models/file-field';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

export class FileUploadModel {
    stringId: string;
    data: File | FileUploadDataModel;
    inProgress: boolean;
    progress: number;
    completed: boolean;
    error?: boolean;
    uploaded?: boolean;
    downloading: boolean;
    sub?: Subscription;
}

interface FileList {
    [key: string]: FileUploadModel;
}

export abstract class AbstractImportNetComponent implements OnInit, AfterViewInit {

    public files: FileList = {};
    public releaseTypes: Array<string> = ['Major', 'Minor', 'Patch'];
    public releaseTypeControl = new FormControl(this.releaseTypes[0]);

    protected _response: PetriNetMessageResource = undefined;
    protected _fileInput: HTMLInputElement;

    constructor(protected _sideMenuControl: SideMenuControl,
                protected _petriNetResource: PetriNetResourceService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
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
            data: this._response ? { net: this._response.net } : undefined
        });
    }

    protected setupFile(file: File): FileUploadModel {
        return {
            data: file, stringId: '', downloading: false, inProgress: false, progress: 0, completed: false, uploaded: false
        };
    }

    protected uploadFiles() {
        this._fileInput.value = '';

        this.fileList.filter(fileModel => !fileModel.completed && fileModel.progress === 0).forEach(file => {
            this.uploadFile(file);
        });
    }

    protected removeFile(file: FileUploadModel) {
        if (this.files[file.data.name]) {
            delete this.files[file.data.name];
            this._sideMenuControl.publish({
                opened: true,
                message: 'Process ' + file.data.name + ' was deleted from the list',
                data: file
            });
        }
    }

    protected uploadFile(file: FileUploadModel) {
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
                this._log.info((response as PetriNetMessageResource).success);
                this._response = (response as PetriNetMessageResource);
                file.inProgress = false;
                file.completed = true;
                this._sideMenuControl.publish({
                    opened: true,
                    message: 'Process ' + file.data.name + ' successfully uploaded',
                    data: {net: (response as PetriNetMessageResource).net}
                });
            }
        }, error => {
            file.inProgress = false;
            file.completed = false;
            file.error = true;
            this._log.error('Importing process file has failed!', error);
            this._snackbar.openErrorSnackBar(
                `${this._translate.instant('workflow.snackBar.uploadFailed')} ${error?.error?.message ?? ''}`);
        });
    }

}
