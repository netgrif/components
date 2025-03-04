import { DataField } from '../../models/abstract-data-field';
import { Behavior } from '../../models/behavior';
import { Layout } from '../../models/layout';
import { Validation } from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import { UserListValue } from './user-list-value';
import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";
import {ProcessRole} from "../../../resources/interface/process-role";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export class UserListField extends DataField<UserListValue> {

    constructor(stringId: string, title: string, behavior: Behavior, value: UserListValue, private _roles: Array<ProcessRole>,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string, validationRegistry?: ValidationRegistryService, injector?: Injector,) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
    }

    get roles(): Array<ProcessRole> {
        return this._roles;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.USER_LIST + this.getComponentType();
    }

    protected valueEquality(a: UserListValue, b: UserListValue): boolean {
        return (!a && !b) ||
            (!!a && !!b && a.userValues?.size === b.userValues?.size);
    }

    protected calculateValidity(forValidRequired: boolean, formControl: FormControl): boolean {
        const isDisabled = formControl.disabled;
        if (forValidRequired) {
            formControl.enable();
        }
        formControl.clearValidators();
        if (forValidRequired) {
            formControl.setValidators(this.behavior.required ? [this.requiredTrue] : []);
        } else {
            formControl.setValidators(this.resolveFormControlValidators());
        }
        formControl.updateValueAndValidity();
        const validity = this._determineFormControlValidity(formControl);
        isDisabled ? formControl.disable() : formControl.enable();
        return validity;
    }


    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(this.requiredTrue);
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

    private requiredTrue(control: AbstractControl): { [k: string]: boolean } {
        return !!control.value && !!control.value._userValues && control.value._userValues.size > 0 ? null : {requiredUserList: true};
    }

}
