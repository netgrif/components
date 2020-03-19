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
        if (this.formControlRef.hasError('required')) {
            return 'This is required';
        }
        if (this.formControlRef.hasError('minlength')) {
            const validation = this.textField.validations.find(value => value.validationRule.includes('length'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to have at least ' + this.formControlRef.errors.minlength.requiredLength;
        }
        if (this.formControlRef.hasError('pattern')) {
            const validation = this.textField.validations.find(value => value.validationRule.includes('regex'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to follow regex pattern';
        }
        if (this.formControlRef.hasError('validTelNumber')) {
            const validation = this.textField.validations.find(value => value.validationRule.includes('telNumber'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to be a telephone number';
        }
        if (this.formControlRef.hasError('email')) {
            const validation = this.textField.validations.find(value => value.validationRule.includes('email'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to be a telephone number';
        }
        return '';
    }
}
