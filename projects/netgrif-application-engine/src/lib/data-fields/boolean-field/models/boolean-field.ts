import {Behavior} from '../../models/behavior';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';

export enum BooleanFieldValidation {
    REQUIRED_TRUE = 'requiredTrue',
    REQUIRED = 'required'
}

export class BooleanField extends DataField<boolean> {

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,  parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    protected resolveValidations(): Array<ValidatorFn> {
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
