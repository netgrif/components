import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TextField} from '../models/text-field';
import {FormControl, NgModel} from '@angular/forms';
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
    options: any;

    constructor() {
        this.options = {
            autoDownloadFontAwesome: true,
            minHeight: '95px',
            toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'image', 'table', '|', 'horizontal-rule', 'preview', '|', 'guide'],
            shortcuts: {
                toggleSideBySide: null,
                toggleFullScreen: null
            }
        };
    }

    ngOnInit(): void {
    }
}
