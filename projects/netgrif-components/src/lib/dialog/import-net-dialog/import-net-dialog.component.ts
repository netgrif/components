import {AfterViewInit, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    EventOutcomeMessageResource,
    FileUploadModel, LoggerService,
    PetriNetEventOutcome,
    PetriNetResourceService, ProgressType, ProviderProgress,
    SnackBarService, UriService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

interface FileList {
    [key: string]: FileUploadModel;
}

@Component({
    selector: 'nc-import-net-dialog',
    templateUrl: './import-net-dialog.component.html',
    styleUrls: ['./import-net-dialog.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 100})),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ],
    standalone: false
})
export class ImportNetDialogComponent implements AfterViewInit {

    public files: FileList = {};
    public releaseTypes: Array<string> = ['Major', 'Minor', 'Patch'];
    public releaseTypeControl = new FormControl(this.releaseTypes[0]);

    protected _response: PetriNetEventOutcome = undefined;
    protected _fileInput: HTMLInputElement;

    constructor(protected _dialogRef: MatDialogRef<ImportNetDialogComponent>,
                protected _petriNetResource: PetriNetResourceService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _uriService: UriService,
                protected _translate: TranslateService) {
        this._dialogRef.backdropClick().subscribe(event => {
            this.close();
        });
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
        this._dialogRef.close({
            opened: false,
            message: 'All process files were processed',
            data: this._response ? {net: this._response.net} : undefined
        });
    }

    protected setupFile(file: File): FileUploadModel {
        return {
            data: file,
            stringId: '',
            downloading: false,
            inProgress: false,
            progress: 0,
            completed: false,
            uploaded: false
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
        }
    }

    protected uploadFile(file: FileUploadModel) {
        const fileFormData = new FormData();
        fileFormData.append('file', file.data as File);
        fileFormData.append('uriNodeId', this._uriService.activeNode.id);
        fileFormData.append('meta', this.releaseTypeControl.value.toString().toUpperCase());

        file.inProgress = true;
        file.completed = false;
        file.error = false;
        file.sub = this._petriNetResource.importPetriNet(fileFormData).subscribe((response: EventOutcomeMessageResource) => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.UPLOAD) {
                file.progress = (response as ProviderProgress).progress;
                if (file.progress === 100) {
                    file.uploaded = true;
                }
            } else {
                this._log.info(response.success);
                this._response = response.outcome as PetriNetEventOutcome;
                file.inProgress = false;
                file.completed = true;
                this._snackbar.openSuccessSnackBar(response.outcome.message === undefined
                    ? this._translate.instant('workflow.snackBar.uploadSuccess')
                    : response.outcome.message);
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
