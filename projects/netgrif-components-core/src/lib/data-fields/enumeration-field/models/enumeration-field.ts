import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';
import {Observable} from "rxjs";
import {debounceTime} from "rxjs/operators";

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

export enum EnumerationFieldValidation {
    WRONG_VALUE = 'wrongValue',
    REQUIRED = 'required'
}

export class EnumerationField extends DataField<string> {
    protected REQUEST_DEBOUNCE_TIME = 600;

    constructor(stringId: string, title: string, value: string,
                protected _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, protected readonly _fieldType = FieldTypeResource.ENUMERATION,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    set choices(choices: Array<EnumerationFieldValue>) {
        this._choices = choices;
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    get fieldType(): FieldTypeResource {
        return this._fieldType;
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.REQUEST_DEBOUNCE_TIME));
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
        return this._choices.find(choice => choice.key === control.value || control.value === null) ? null : {wrongValue: true};
    }
}
