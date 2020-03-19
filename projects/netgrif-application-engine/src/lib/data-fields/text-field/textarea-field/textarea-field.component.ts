import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'nae-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {

    @Input() textAreaField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit() {
    }

    getErrorMessage() {
        if (this.formControlRef.hasError('required')) {
            return 'This is required';
        }
        if (this.formControlRef.hasError('minlength')) {
            const validation = this.textAreaField.validations.find(value => value.validationRule.includes('length'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to have at least ' + this.formControlRef.errors.minlength.requiredLength;
        }
        if (this.formControlRef.hasError('pattern')) {
            const validation = this.textAreaField.validations.find(value => value.validationRule.includes('regex'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to follow regex pattern';
        }
        if (this.formControlRef.hasError('validTelNumber')) {
            const validation = this.textAreaField.validations.find(value => value.validationRule.includes('telNumber'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to be a telephone number';
        }
        if (this.formControlRef.hasError('email')) {
            const validation = this.textAreaField.validations.find(value => value.validationRule.includes('email'));
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
            return 'This field need to be a telephone number';
        }
        return '';
    }
}
