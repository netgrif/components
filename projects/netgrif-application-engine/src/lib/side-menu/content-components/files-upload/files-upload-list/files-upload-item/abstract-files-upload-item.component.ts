import {Input, OnInit} from '@angular/core';
import {FileFieldService} from '../../../../../data-fields/file-field/services/file-field.service';
import {FileUploadModel} from '../../models/file-upload-model';
import {FileUploadDataModel} from '../../../../../data-fields/file-field/models/file-field';

/**
 * Handle the whole functionality and visualization of one line in the files upload list.
 */
export abstract class AbstractFilesUploadItemComponent implements OnInit {
    /**
     * Binding property [FileFieldService]{@link FileFieldService} from
     * parent [FilesUploadListComponent]{@link AbstractFilesUploadListComponent}.
     */
    @Input() public fileFieldService: FileFieldService;
    /**
     * Binding property file from parent [FilesUploadListComponent]{@link AbstractFilesUploadListComponent}.
     */
    @Input() public file: FileUploadModel;
    /**
     * Display file size in bytes.
     */
    public fileSize: number;

    /**
     * Initialize display file size.
     */
    ngOnInit(): void {
        this.fileSize = (this.file.data as FileUploadDataModel).file.size;
    }

    /**
     * Handle click event on close button.
     *
     * Remove selected file from all files array.
     * @param file Selected file for remove from all files
     */
    public cancelFile(file: FileUploadModel) {
        this.fileFieldService.cancelFile(file);
    }

    /**
     * Handle click event on reload button.
     *
     * Retry upload selected file.
     * @param file Selected file for re-upload
     */
    public retryFile(file: FileUploadModel) {
        this.fileFieldService.retryFile(file, null);
    }

    /**
     * Handle click event on underlined display file name.
     *
     * Begin download selected file.
     * @param file Selected file for download
     */
    public onFileDownload(file: FileUploadModel) {
        this.fileFieldService.onFileDownload(file, null);
    }

    /**
     * Construct short file display name if file name length has over 18 characters.
     * @param file Selected file for shorts display name
     */
    public shortFileName(file: FileUploadModel) {
        const fileNameLength = 18;
        return file.data.name.length > fileNameLength ?
            file.data.name.slice(0, fileNameLength - (file.data as FileUploadDataModel).extension.length - '...'.length) +
            '...' +
            (file.data as FileUploadDataModel).extension :
            (file.data as FileUploadDataModel).file.name;
    }

}
