import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'nae-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent {

    @Input() textField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    getErrorMessage() {
        if (this.formControlRef.hasError('minlength')) {
            return this.resolveErrorMessage('length',
                'Entered text must be at the most ' + this.formControlRef.errors.minlength.requiredLength);
        }
        if (this.formControlRef.hasError('pattern')) {
            return this.resolveErrorMessage('regex', 'Entered text is in wrong format');
        }
        if (this.formControlRef.hasError('validTelNumber')) {
            return this.resolveErrorMessage('telNumber', 'Entered text must be in telephone number format');
        }
        if (this.formControlRef.hasError('email')) {
            return this.resolveErrorMessage('email', 'Entered test must be in email format');
        }
        return '';
    }

    resolveErrorMessage(search: string, generalMessage: string) {
        const validation = this.textField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
