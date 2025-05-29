import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component, ComponentPrefixes} from '../../models/component';
import {Validation} from '../../models/validation';

export class CaseRefField extends DataField<Array<string>> {

    constructor(stringId: string, title: string, initialValue: Array<string>, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, initialValue, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.CASE_REF + this.getComponentType();
    }
}
