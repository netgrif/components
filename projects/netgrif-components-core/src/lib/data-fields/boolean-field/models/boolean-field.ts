import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {Validator} from "../../../registry/model/validator";
import {UpdateOnStrategy, UpdateStrategy} from "../../models/update-strategy";

export enum BooleanFieldValidation {
    REQUIRED_TRUE = 'requiredTrue',
    REQUIRED = 'required'
}

export class BooleanField extends DataField<boolean> {

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validatorRegister?: Map<string, Validator>) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId,
            undefined, validatorRegister);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.BOOLEAN + this.getComponentType();
    }

    public getUpdateOnStrategy(): UpdateOnStrategy {
        return UpdateStrategy.CHANGE;
    }
}
