import {Component, Input} from '@angular/core';
import {TextField} from '../models/text-field';
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

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
