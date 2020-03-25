import {Component, Inject, OnInit} from '@angular/core';
import {FileField, FileUploadModel} from '../../data-fields/file-field/models/file-field';
import {FileFieldService} from '../../data-fields/file-field/services/file-field.service';
import {NAE_SIDE_MENU_DATA} from '../side-menu-injection-token/side-menu-injection-token.module';

export interface FilesUploadInjectedData {
    fileFieldService: FileFieldService;
}

@Component({
    selector: 'nae-files-upload',
    templateUrl: './files-upload.component.html',
    styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

    public multiple: string;
    public fileField: FileField;
    public allFiles: Array<FileUploadModel> = [];

    private readonly _fileFieldService: FileFieldService;

    constructor(@Inject(NAE_SIDE_MENU_DATA) injectedData: FilesUploadInjectedData) {
        this._fileFieldService = injectedData.fileFieldService;
        this.allFiles = this._fileFieldService.allFiles;
        this.fileField = this._fileFieldService.fileField;
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

    get fileFieldService(): FileFieldService {
        return this._fileFieldService;
    }
}
