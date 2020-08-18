import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list',
    AUTOCOMPLETE = 'autocomplete'
}

export enum EnumerationFieldValidation {
    WRONG_VALUE = 'wrongValue',
    REQUIRED = 'required'
}

export class EnumerationField extends DataField<string> {

    constructor(stringId: string, title: string, value: string,
                private _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, private _view = EnumerationFieldView.DEFAULT) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    set choices(choices: Array<EnumerationFieldValue>) {
         this._choices = choices;
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    set view(view: EnumerationFieldView) {
        this._view = view;
    }

    get view(): EnumerationFieldView {
        return this._view;
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }
        result.push((control: AbstractControl) => this.checkKey(control));

        return result;
    }

    private checkKey(control: AbstractControl): ValidationErrors | null {
        if (this._choices === undefined || this._choices.length === 0 || control.value === '' || control.value === undefined) {
            return null;
        }
        return this._choices.find(choice => choice.key === control.value) ? null : {wrongValue: true};
    }
}
