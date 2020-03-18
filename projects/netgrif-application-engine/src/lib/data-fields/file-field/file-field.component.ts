import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {FilesUploadComponent} from '../../side-menu/files-upload/files-upload.component';
import {SideMenuService, SideMenuWidth} from '../../side-menu/services/side-menu.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss']
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
        this.name = this.dataField.value ? this.dataField.value.name : this.dataField.placeholder;
    }

    ngAfterViewInit(): void {
        this._fileFieldService.fileUploadEl = this.fileUploadEl;
    }

    public onFileUpload() {
        if (this._fileFieldService.allFiles.length !== 0) {
            this._sideMenuService.open(FilesUploadComponent, SideMenuWidth.LARGE);
        } else {
            this._fileFieldService.fileUpload();
            this._sideMenuService.open(FilesUploadComponent, SideMenuWidth.LARGE);
        }
    }

}

