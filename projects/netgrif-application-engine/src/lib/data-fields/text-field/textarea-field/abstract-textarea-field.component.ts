import {Input} from '@angular/core';
import {TextAreaHeight, TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';

export abstract class AbstractTextareaFieldComponent extends AbstractTextErrorsComponent {

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
