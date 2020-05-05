import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../models/text-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {AbstractTextFieldComponent} from '../abstract-text-field.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../translate/language.service';

@Component({
    selector: 'nae-rich-textarea-field',
    templateUrl: './rich-textarea-field.component.html',
    styleUrls: ['./rich-textarea-field.component.scss']
})
export class RichTextareaFieldComponent extends AbstractTextFieldComponent implements OnInit {

    @Input() textAreaField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    options: any;
    // TODO BUG: update on blur dont working, switch back to update on ngModel

    constructor(protected _translate: TranslateService, private _lang: LanguageService) {
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

    ngOnInit(): void {
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
