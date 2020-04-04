import {Component, Input} from '@angular/core';
import {FileFieldService} from '../../../../../data-fields/file-field/services/file-field.service';
import {FileUploadModel} from '../../models/file-upload-model';
import {FileUploadDataModel} from '../../../../../data-fields/file-field/models/file-field';

@Component({
    selector: 'nae-files-upload-item',
    templateUrl: './files-upload-item.component.html',
    styleUrls: ['./files-upload-item.component.scss']
})
export class FilesUploadItemComponent {

    @Input() public fileFieldService: FileFieldService;
    public fileSize: number;

    private _file: FileUploadModel;

    get file(): FileUploadModel {
        return this._file;
    }

    @Input()
    set file(file: FileUploadModel) {
        this.file = file;
        this.fileSize = (file.data as FileUploadDataModel).file.size;
    }

    public cancelFile(file: FileUploadModel) {
        this.fileFieldService.cancelFile(file);
    }

    public retryFile(file: FileUploadModel) {
        this.fileFieldService.retryFile(file);
    }

    public onFileDownload(file: FileUploadModel) {
        this.fileFieldService.onFileDownload(file);
    }

    public shortFileName(file: FileUploadModel) {
        const fileNameLength = 18;
        return file.data.name.length > fileNameLength ?
            file.data.name.slice(0, fileNameLength - (file.data as FileUploadDataModel).extension.length - '...'.length) +
            '...' +
            (file.data as FileUploadDataModel).extension :
            (file.data as FileUploadDataModel).file.name;
    }

}
