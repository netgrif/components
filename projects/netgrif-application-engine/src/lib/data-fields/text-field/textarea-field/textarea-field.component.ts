import {Component, Input} from '@angular/core';
import {TextAreaHeight, TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {AbstractTextFieldComponent} from '../abstract-text-field.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nae-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextFieldComponent {

    @Input() textAreaField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }

    public getHeight() {
        const oneHeight = this.textAreaField.layout && this.textAreaField.layout.appearance === 'outline' ?
            TextAreaHeight.OUTLINE : TextAreaHeight.FILL_STANDARD;
        return this.textAreaField.layout && this.textAreaField.layout.rows && this.textAreaField.layout.rows !== 1 ?
            (this.textAreaField.layout.rows - 1) * TextField.FIELD_HEIGHT + oneHeight : oneHeight;
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
