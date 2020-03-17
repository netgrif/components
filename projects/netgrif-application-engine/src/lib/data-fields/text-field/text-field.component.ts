import {Component, Input, OnInit} from '@angular/core';
import {TextField} from './models/text-field';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {ChangedFields} from './ChangedFields';

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
    @Input() formControlRef: FormControl;
    @Input() changedFields: Subject<ChangedFields>;

    constructor() {
    }

    ngOnInit() {

    }

}
