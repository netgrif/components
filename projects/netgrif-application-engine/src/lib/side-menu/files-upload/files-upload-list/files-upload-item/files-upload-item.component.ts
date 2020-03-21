import {Component, Input} from '@angular/core';
import {FileUploadModel} from '../../../../data-fields/file-field/models/file-field';
import {FileFieldService} from '../../../../data-fields/file-field/services/file-field.service';

@Component({
    selector: 'nae-files-upload-item',
    templateUrl: './files-upload-item.component.html',
    styleUrls: ['./files-upload-item.component.scss']
})
export class FilesUploadItemComponent {

    @Input() public file: FileUploadModel;
    @Input() public fileFieldService: FileFieldService;

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
            file.data.name.slice(0, fileNameLength - file.data.extension.length - '...'.length) + '...' + file.data.extension :
            file.data.file.name;
    }

}
