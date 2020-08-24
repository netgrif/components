import {Component} from '@angular/core';
import {AbstractFilesUploadItemComponent} from '@netgrif/application-engine';

/**
 * Handle the whole functionality and visualization of one line in the files upload list.
 */
@Component({
    selector: 'nc-files-upload-item',
    templateUrl: './files-upload-item.component.html',
    styleUrls: ['./files-upload-item.component.scss']
})
export class FilesUploadItemComponent extends AbstractFilesUploadItemComponent {
    constructor() {
        super();
    }
}
