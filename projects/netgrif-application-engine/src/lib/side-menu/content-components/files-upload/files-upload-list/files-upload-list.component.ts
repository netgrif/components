import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FileFieldService} from '../../../../data-fields/file-field/services/file-field.service';
import {FileUploadModel} from '../models/file-upload-model';

/**
 * Holds array of all successfully uploaded files.
 *
 * Provides fade in and out animations for file upload item components as parent list component.
 */
@Component({
    selector: 'nae-files-upload-list',
    templateUrl: './files-upload-list.component.html',
    styleUrls: ['./files-upload-list.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 100})),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ]
})
export class FilesUploadListComponent {
    /**
     * Binding property all choose files from parent [FilesUploadComponent]{@link FilesUploadComponent}.
     */
    @Input() public allFiles: Array<FileUploadModel> = [];
    /**
     * Binding property [FileFieldService]{@link FileFieldService} from parent [FilesUploadComponent]{@link FilesUploadComponent}.
     */
    @Input() public fileFieldService: FileFieldService;

}
