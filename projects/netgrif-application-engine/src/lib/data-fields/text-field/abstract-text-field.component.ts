import {FormControl} from '@angular/forms';
import {TextField} from './models/text-field';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractTextFieldComponent {

    protected constructor(protected _translate: TranslateService) {
    }

    protected buildErrorMessage(textField: TextField, formControlRef: FormControl) {
        if (formControlRef.hasError('required')) {
            return this._translate.instant('dataField.validations.required');
        }
        if (formControlRef.hasError('minlength')) {
            return this.resolveErrorMessage(textField, 'minLength',
                this._translate.instant('dataField.validations.minLength', {length: formControlRef.errors.minlength.requiredLength}));
        }
        if (formControlRef.hasError('maxlength')) {
            return this.resolveErrorMessage(textField, 'maxLength',
                this._translate.instant('dataField.validations.maxLength', {length: formControlRef.errors.minlength.requiredLength}));
        }
        if (formControlRef.hasError('pattern')) {
            return this.resolveErrorMessage(textField, 'regex', this._translate.instant('dataField.validations.pattern'));
        }
        if (formControlRef.hasError('validTelNumber')) {
            return this.resolveErrorMessage(textField, 'telNumber', this._translate.instant('dataField.validations.phone'));
        }
        if (formControlRef.hasError('email')) {
            return this.resolveErrorMessage(textField, 'email', this._translate.instant('dataField.validations.email'));
        }
        return '';
    }

    private resolveErrorMessage(textField: TextField, search: string, generalMessage: string) {
        const validation = textField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
