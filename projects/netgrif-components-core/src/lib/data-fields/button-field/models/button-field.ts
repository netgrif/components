import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component, ComponentPrefixes} from '../../models/component';
import {Validation} from '../../models/validation';

export enum ButtonFieldValidation {
    REQUIRED = 'required'
}

export class ButtonField extends DataField<number> {

    constructor(stringId: string, title: string, behavior: Behavior, value?: number, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, (value === undefined) ? 0 : value, behavior, placeholder, description,
            layout, validations, component, parentTaskId);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.BUTTON + this.getComponentType();
    }
}
