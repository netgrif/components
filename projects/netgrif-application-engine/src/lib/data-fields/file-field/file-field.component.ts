import {Component, Input, OnInit} from '@angular/core';
import {FileField} from "./file-field";

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent implements OnInit {

    @Input() public fileField: FileField;

    constructor() {
    }

    ngOnInit() {
    }



}
