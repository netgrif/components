import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField} from "./file-field";
import {FileFieldService} from "./file-field.service";

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent implements OnInit, AfterViewInit{

    public multiple: string;

    @Input() public fileField: FileField;
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    constructor(private _fileFieldService: FileFieldService) {
    }

    ngOnInit() {
        this._fileFieldService.fileField = this.fileField;
        this.multiple = this.fileField.maxUploadFiles > 1 ? 'multiple' : undefined;
    }

    ngAfterViewInit(): void {
        this._fileFieldService.fileUploadEl = this.fileUploadEl;
    }

    public onFileUpload() {
        this._fileFieldService.onFileUpload(true)
    }

}

