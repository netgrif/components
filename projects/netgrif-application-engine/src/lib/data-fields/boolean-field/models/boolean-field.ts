import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';

export enum BooleanFieldValidation {
    REQUIRED_TRUE = 'requiredTrue',
    REQUIRED = 'required'
}

export class BooleanField extends DataField<boolean> {

    private _validators: Array<ValidatorFn>;

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout, public validations?: Validation[]) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        if (this.validations) {
            if (this._validators) {
                result.push(...this._validators);
            } else {
                this._validators = this.resolveValidations();
                result.push(...this._validators);
            }
        }

        return result;
    }

    private resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(BooleanFieldValidation.REQUIRED_TRUE)) {
                result.push(this.requiredTrue);
            }
        });

        return result;
    }

    private requiredTrue(control: AbstractControl): ValidationErrors | null {
        return control.value === true ? null : {requiredTrue: true};
    }
}
