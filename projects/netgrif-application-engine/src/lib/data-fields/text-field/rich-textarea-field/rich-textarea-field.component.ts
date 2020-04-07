import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../models/text-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'nae-rich-textarea-field',
    templateUrl: './rich-textarea-field.component.html',
    styleUrls: ['./rich-textarea-field.component.scss']
})
export class RichTextareaFieldComponent implements OnInit {

    @Input() textAreaField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
