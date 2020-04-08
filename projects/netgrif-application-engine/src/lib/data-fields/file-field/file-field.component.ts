import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {FilesUploadComponent} from '../../side-menu/content-components/files-upload/files-upload.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    providers: [FileFieldService]
})
export class FileFieldComponent extends AbstractDataFieldComponent implements OnInit, AfterViewInit {

    public multiple: string;
    public name: string;

    @Input() public dataField: FileField;
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    constructor(private _fileFieldService: FileFieldService, private _sideMenuService: SideMenuService) {
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
    }

    public onFileUpload() {
        if (this._fileFieldService.allFiles.length !== 0) {
            this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this._fileFieldService);
        } else {
            this._fileFieldService.fileUpload();
            this._sideMenuService.open(FilesUploadComponent, SideMenuSize.LARGE, this._fileFieldService);
        }
    }

    private constructDisplayName(): string {
        if (this.dataField.value !== undefined) {
            return this.dataField.value.map(file => file.name).join(', ');
        } else {
            return this.dataField.placeholder;
        }
    }

}

