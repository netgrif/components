import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

/*@deprecated in 4.3.0*/
export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list',
    AUTOCOMPLETE = 'autocomplete',
    STEPPER= 'stepper'
}

export enum EnumerationFieldValidation {
    WRONG_VALUE = 'wrongValue',
    REQUIRED = 'required'
}

export class EnumerationField extends DataField<string> {

    constructor(stringId: string, title: string, value: string,
                protected _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, protected _view = EnumerationFieldView.DEFAULT,
                protected readonly _fieldType = FieldTypeResource.ENUMERATION,
                validations?: Validation[], component?: Component) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component);
    }

    set choices(choices: Array<EnumerationFieldValue>) {
         this._choices = choices;
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    /*@deprecated in 4.3.0*/
    set view(view: EnumerationFieldView) {
        this._view = view;
    }

    /*@deprecated in 4.3.0*/
    get view(): EnumerationFieldView {
        return this._view;
    }

    get fieldType(): FieldTypeResource {
        return this._fieldType;
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

    getType(): string {
        return !!this.component && !!this.component.name ? this.component.name : this.view;
    }
}
