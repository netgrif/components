import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {FilesUploadComponent} from '../../side-menu/content-components/files-upload/files-upload.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    providers: [FileFieldService]
})
export class FileFieldComponent extends AbstractDataFieldComponent implements OnInit, AfterViewInit {

    public multiple: string;
    public name: string;
    public taskId: string;

    @Input() public dataField: FileField;
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;
    @ViewChild('imageEl') public imageEl: ElementRef<HTMLImageElement>;

    constructor(private _fileFieldService: FileFieldService,
                private _sideMenuService: SideMenuService,
                private _taskResourceService: TaskResourceService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this._fileFieldService.fileField = this.dataField;
        this.multiple = this.dataField.maxUploadFiles > 1 ? 'multiple' : undefined;
        this.name = this.constructDisplayName();
    }

    ngAfterViewInit(): void {
        this._fileFieldService.fileUploadEl = this.fileUploadEl;
        this._fileFieldService.imageEl = this.imageEl;
        this.initFileFieldImage();
    }

    public onFileUpload() {
        if (this._fileFieldService.allFiles.length !== 0) {
            this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this._fileFieldService);
        } else {
            this._fileFieldService.fileUpload();
        }
    }

    private constructDisplayName(): string {
        if (this.dataField.value !== undefined) {
            return this.dataField.value.map(file => file.name).join(', ');
        } else {
            return this.dataField.placeholder;
        }
    }

    private initFileFieldImage() {
        this._taskResourceService.downloadFile(this.taskId, this.dataField.stringId)
            .subscribe(fileBlob => {
                this._fileFieldService.allFiles = [];
                this._fileFieldService.allFiles.push(this._fileFieldService.createFileUploadModel(new File([fileBlob], this.name), true));

                // TODO: 11.4.2020 unify image element assignment URL
                //  for blob or file type as arguments to setImageSourceUrl function in FileFieldService
                //  this._fileFieldService.setImageSourceUrl(fileBlob)
                const reader = new FileReader();
                reader.readAsDataURL(fileBlob);
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        this.imageEl.nativeElement.src = reader.result;
                        this.imageEl.nativeElement.alt = this.name;
                    }
                };
            });
    }

}

