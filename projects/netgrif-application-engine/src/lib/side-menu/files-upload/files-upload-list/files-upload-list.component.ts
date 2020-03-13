import {Component, Input, OnInit} from '@angular/core';
import {FileUploadModel} from '../../../data-fields/file-field/file-field';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
export class FilesUploadListComponent implements OnInit {

    @Input() public allFiles: Array<FileUploadModel> = [];

    ngOnInit() {
    }

}
