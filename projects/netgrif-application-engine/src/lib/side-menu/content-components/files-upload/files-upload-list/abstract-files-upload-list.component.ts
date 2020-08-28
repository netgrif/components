import {Input} from '@angular/core';
import {FileFieldService} from '../../../../data-fields/file-field/services/file-field.service';
import {FileUploadModel} from '../models/file-upload-model';

/**
 * Holds array of all successfully uploaded files.
 *
 * Provides fade in and out animations for file upload item components as parent list component.
 */
export abstract class AbstractFilesUploadListComponent {
    /**
     * Binding property all choose files from parent [FilesUploadComponent]{@link AbstractFilesUploadComponent}.
     */
    @Input() public allFiles: Array<FileUploadModel> = [];
    /**
     * Binding property [FileFieldService]{@link FileFieldService} from parent [FilesUploadComponent]{@link AbstractFilesUploadComponent}.
     */
    @Input() public fileFieldService: FileFieldService;

}
