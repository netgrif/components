import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component, ComponentPrefixes} from '../../models/component';
import {Validation} from '../../models/validation';
import {Observable, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {UpdateOnStrategy, UpdateStrategy} from "../../models/update-strategy";

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
    protected _updatedChoices: Subject<void>;

    constructor(stringId: string, title: string, value: string,
                protected _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, protected readonly _fieldType = FieldTypeResource.ENUMERATION,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
        this._updatedChoices = new Subject<void>();
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

    public getUpdateOnStrategy(): UpdateOnStrategy {
        return UpdateStrategy.CHANGE;
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.REQUEST_DEBOUNCE_TIME));
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.ENUMERATION + this.getComponentType();
    }

    get updatedChoices(): Observable<void> {
        return this._updatedChoices.asObservable();
    }

    public updateChoice(): void {
        this._updatedChoices.next();
    }

    public destroy(): void {
        super.destroy();
        this._updatedChoices.complete();
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
