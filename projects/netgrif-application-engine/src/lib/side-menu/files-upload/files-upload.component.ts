import {Component, OnInit} from '@angular/core';
import {FileField, FileUploadModel} from "../../data-fields/file-field/file-field";
import {FileFieldService} from "../../data-fields/file-field/file-field.service";

@Component({
    selector: 'nae-files-upload',
    templateUrl: './files-upload.component.html',
    styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

    public multiple: string;
    public fileField: FileField;
    public allFiles: Array<FileUploadModel> = [];

    constructor(private _fileFieldService: FileFieldService) {
        this.allFiles = _fileFieldService.allFiles;
        this.fileField = _fileFieldService.fileField;
    }

    ngOnInit() {
        this.multiple = this.fileField.maxUploadFiles > 1 ? 'multiple' : undefined;
    }

    public onFileUpload() {
        this._fileFieldService.fileUpload();
    }

    public onSend() {
        this._fileFieldService.onSend();
    }
}
