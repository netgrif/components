import {FormControl} from '@angular/forms';
import {TextField} from './models/text-field';

export abstract class AbstractTextFieldComponent {

    protected constructor() {
    }

    protected buildErrorMessage(textField: TextField, formControlRef: FormControl) {
        if (formControlRef.hasError('required')) {
            return 'This field is required!';
        }
        if (formControlRef.hasError('minlength')) {
            return this.resolveErrorMessage(textField, 'length',
                'Entered text must be at the most ' + formControlRef.errors.minlength.requiredLength);
        }
        if (formControlRef.hasError('pattern')) {
            return this.resolveErrorMessage(textField, 'regex', 'Entered text is in wrong format');
        }
        if (formControlRef.hasError('validTelNumber')) {
            return this.resolveErrorMessage(textField, 'telNumber', 'Entered text must be in telephone number format');
        }
        if (formControlRef.hasError('email')) {
            return this.resolveErrorMessage(textField, 'email', 'Entered test must be in email format');
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
