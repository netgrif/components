import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from './models/file-field';
import {FileFieldService} from './services/file-field.service';
import {FilesUploadComponent} from '../../side-menu/files-upload/files-upload.component';
import {SideMenuService, SideMenuWidth} from '../../side-menu/side-menu.service';

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent implements OnInit, AfterViewInit {

    public multiple: string;
    public name: string;

    @Input() public fileField: FileField;
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    constructor(private _fileFieldService: FileFieldService,
                private _sideMenuService: SideMenuService) {
    }

    ngOnInit() {
        this._fileFieldService.fileField = this.fileField;
        this.multiple = this.fileField.maxUploadFiles > 1 ? 'multiple' : undefined;
        this.name = this.fileField.value ? this.fileField.value.name : this.fileField.placeholder;
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

