import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileField, FileUploadModel} from "../../data-fields/file-field/file-field";
import {FileFieldService} from "../../data-fields/file-field/file-field.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'nae-files-upload',
    templateUrl: './files-upload.component.html',
    styleUrls: ['./files-upload.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 100})),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ]
})
export class FilesUploadComponent implements OnInit {

    public multiple: string;
    public allFiles: Array<FileUploadModel> = [];

    public fileField: FileField;
    @ViewChild('fileList') public fileListEl: ElementRef;

    constructor(private _fileFieldService: FileFieldService) {
        this.allFiles = _fileFieldService.allFiles;
        this.fileField = _fileFieldService.fileField;
    }

    ngOnInit() {
        this.multiple = this.fileField.maxUploadFiles > 1 ? 'multiple' : undefined;
    }

    public onFileUpload() {
        this._fileFieldService.onFileUpload(false);
    }

    public onSend() {
        this._fileFieldService.onSend();
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
        const fileNameLength: number = 25;
        return file.data.name.length > fileNameLength ?
            file.data.name.slice(0, fileNameLength - file.data.extension.length - '...'.length) + '...' + file.data.extension :
            file.data.file.name;
    }
}
