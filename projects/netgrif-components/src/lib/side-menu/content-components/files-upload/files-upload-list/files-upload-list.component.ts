import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AbstractFilesUploadListComponent} from '@netgrif/application-engine';

/**
 * Holds array of all successfully uploaded files.
 *
 * Provides fade in and out animations for file upload item components as parent list component.
 */
@Component({
    selector: 'nc-files-upload-list',
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
export class FilesUploadListComponent extends AbstractFilesUploadListComponent {
    constructor() {
        super();
    }
}
