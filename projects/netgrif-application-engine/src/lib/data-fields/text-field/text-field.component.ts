import {Component, Input, OnInit} from '@angular/core';
import {TextField} from "./text-field";

export enum TextFieldType {
    LEGACY = 'legacy',
    STANDARD = 'standard',
    FILL = 'fill',
    OUTLINE = 'outline'
}

@Component({
    selector: 'nae-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

    @Input() textField: TextField;

    constructor() {
    }

    ngOnInit() {

    }

}
