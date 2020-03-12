import {Component, Input, OnInit} from '@angular/core';
import {FileUploadModel} from "../../../../data-fields/file-field/models/file-field";
import {FileFieldService} from "../../../../data-fields/file-field/services/file-field.service";

@Component({
    selector: 'nae-files-upload-item',
    templateUrl: './files-upload-item.component.html',
    styleUrls: ['./files-upload-item.component.scss']
})
export class FilesUploadItemComponent implements OnInit {

    @Input() public file: FileUploadModel;

    constructor(private _fileFieldService: FileFieldService) {
    }

    ngOnInit() {
    }

    public cancelFile(file: FileUploadModel) {
        this._fileFieldService.cancelFile(file);
    }

    public retryFile(file: FileUploadModel) {
        this._fileFieldService.retryFile(file);
    }

    public onFileDownload(file: FileUploadModel) {
        this._fileFieldService.onFileDownload(file);
    }

    public shortFileName(file: FileUploadModel) {
        const fileNameLength: number = 18;
        return file.data.name.length > fileNameLength ?
            file.data.name.slice(0, fileNameLength - file.data.extension.length - '...'.length) + '...' + file.data.extension :
            file.data.file.name;
    }

}
