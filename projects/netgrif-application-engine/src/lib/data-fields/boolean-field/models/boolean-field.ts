import {DataField, Layout, Validation} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {ValidatorFn, Validators} from '@angular/forms';

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
            if (this._validators === undefined) {
                this._validators = [];
                this._validators = this.resolveValidations();
                result.push(...this._validators);
            } else {
                result.push(...this._validators);
            }
        }

        return result;
    }

    private resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes('requiredTrue')) {
                result.push(Validators.requiredTrue);
            }
        });

        return result;
    }
}
