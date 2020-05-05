import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {FilesUploadComponent} from '../../side-menu/content-components/files-upload/files-upload.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {ProgressType, ProviderProgress} from '../../resources/resource-provider.service';
import {MessageResource} from '../../resources/interface/message-resource';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';

export interface FileState {
    progress: number;
    uploading: boolean;
    downloading: boolean;
    completed: boolean;
    error: boolean;
}

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    providers: [FileFieldService]
})
export class FileFieldComponent extends AbstractDataFieldComponent implements OnInit, AfterViewInit {
    /**
     * Decisions between choose one or multiple files.
     */
    public multiple: string;
    /**
     * Keep display name.
     */
    public name: string;
    public state: FileState;
    /**
     * Task mongo string id is binding property from parent component.
     */
    @Input() public taskId: string;
    /**
     * Binding property as instance from parent component.
     */
    @Input() public dataField: FileField;
    /**
     * File picker element reference from component template that is initialized after view init.
     */
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;
    /**
     * Image field view element reference from component template that is initialized after view init.
     */
    @ViewChild('imageEl') public imageEl: ElementRef<HTMLImageElement>;

    /**
     * Only inject services.
     * @param _fileFieldService Handles communication between components
     * @param _sideMenuService Open right side menu
     * @param _taskResourceService Provides to download a file from the backend
     * @param _log Logger service
     * @param _snackbar Snackbar service to notify user
     */
    constructor(private _fileFieldService: FileFieldService,
                private _sideMenuService: SideMenuService,
                private _taskResourceService: TaskResourceService,
                private _log: LoggerService,
                private _snackbar: SnackBarService) {
        super();
        this.state = {
            progress: 0,
            uploading: false,
            downloading: false,
            completed: false,
            error: false
        };
    }

    /**
     * Set :
     *  - File field to [FileFieldService]{@link FileFieldService}
     *  - Choice between one or multiple files
     *  - Display name
     */
    ngOnInit() {
        super.ngOnInit();
        this._fileFieldService.fileField = this.dataField;
        this.multiple = this.dataField.maxUploadFiles > 1 ? 'multiple' : undefined;
        this.name = this.constructDisplayName();
    }

    /**
     * Set file picker and image elements to [FileFieldService]{@link FileFieldService}.
     *
     * Initialize file image.
     */
    ngAfterViewInit(): void {
        this._fileFieldService.fileUploadEl = this.fileUploadEl;
        this._fileFieldService.imageEl = this.imageEl;
        this.initFileFieldImage();
    }

    /**
     * Call after click on file field.
     *
     * If file field has no file uploaded
     * [FilesUploadComponent]{@link FilesUploadComponent} via [SideMenu]{@link SideMenuService} opens.
     *
     * Otherwise opens a file picker from which the user can select files.
     */
    public upload() {
        if (this._fileFieldService.allFiles.length !== 0) {
            this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this._fileFieldService);
        } else {
            this._fileFieldService.fileUpload();
        }
    }

    public download() {
        if (!this.dataField.value || !this.dataField.value.name) {
            return;
        }
        this.state.downloading = true;
        this._taskResourceService.downloadFile(this.taskId, this.dataField.stringId).subscribe(response => {
            if ((response as ProviderProgress).type && (response as ProviderProgress).type === ProgressType.DOWNLOAD) {
                this.state.progress = (response as ProviderProgress).progress;
            } else {
                this._log.info((response as MessageResource).success);
                this.state.completed = true;
                const file: File = new File([response as Blob], this.name);
            }
        }, error => {
            this.state.completed = false;
            this.state.error = true;
            this._log.error('Importing process file has failed!', error);
            this._snackbar.openErrorSnackBar('Uploading process file has failed');
        });
    }

    public cancel() {

    }

    /**
     * Construct display name.
     */
    private constructDisplayName(): string {
        return this.dataField.value && this.dataField.value.name ? this.dataField.value.name : this.dataField.placeholder;
    }

    /**
     * Initialize file field image from backend if it is image type.
     */
    private initFileFieldImage() {
        // this._taskResourceService.downloadFile(this.taskId, this.dataField.stringId)
        //     .subscribe(fileBlob => {
        //         const file: File = new File([fileBlob], this.name);
        //         if (!file.type.includes('image')) {
        //             return;
        //         }
        //         this._fileFieldService.allFiles = [];
        //         this._fileFieldService.allFiles.push(this._fileFieldService.createFileUploadModel(file, true));
        //
        //         // TODO: 11.4.2020 unify image element assignment URL
        //         //  for blob or file type as arguments to setImageSourceUrl function in FileFieldService
        //         //  this._fileFieldService.setImageSourceUrl(fileBlob)
        //         const reader = new FileReader();
        //         reader.readAsDataURL(fileBlob);
        //         reader.onloadend = () => {
        //             if (typeof reader.result === 'string') {
        //                 this.imageEl.nativeElement.src = reader.result;
        //                 this.imageEl.nativeElement.alt = this.name;
        //             }
        //         };
        //     });
    }

}

