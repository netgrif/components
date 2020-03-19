import {Component, Input, OnInit} from '@angular/core';
import {FileUploadModel} from '../../../data-fields/file-field/models/file-field';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FileFieldService} from '../../../data-fields/file-field/services/file-field.service';

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

    @Input() public allFiles: Array<FileUploadModel> = [];
    @Input() public fileFieldService: FileFieldService;

}
