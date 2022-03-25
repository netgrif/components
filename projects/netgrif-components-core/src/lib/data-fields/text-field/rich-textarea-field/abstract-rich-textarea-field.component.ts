import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';

@Component({
    selector: 'ncc-abstract-rich-text-field',
    template: ''
})
export abstract class AbstractRichTextareaFieldComponent extends AbstractTextErrorsComponent {

    @Input() textAreaField: TextAreaField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    options: any;

    // TODO BUG: update on blur dont working, switch back to update on ngModel

    constructor(protected _translate: TranslateService) {
        super(_translate);
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

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
