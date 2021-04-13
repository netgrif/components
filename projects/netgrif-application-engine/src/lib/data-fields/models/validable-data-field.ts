import {ValidatorFn, Validators} from '@angular/forms';
import {Validation} from './validation';
import {DataField} from './abstract-data-field';
import {Behavior} from './behavior';
import {Layout} from './layout';
import {Component} from './component';

export abstract class ValidableDataField<T> extends DataField<T> {

    protected _validators: Array<ValidatorFn>;

    protected constructor(stringId: string, _title: string, initialValue: T,
                          _behavior: Behavior, _placeholder?: string, _description?: string,
                          _layout?: Layout, public validations?: Validation[], _component?: Component) {
        super(stringId, _title, initialValue, _behavior, _placeholder, _description, _layout, _component);
    }

    public setValidations(validations: Validation[]) {
        this.clearValidators();
        this.validations = validations;
    }

    public clearValidators(): void {
        this._validators = null;
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

    protected abstract resolveValidations(): Array<ValidatorFn>;
}
