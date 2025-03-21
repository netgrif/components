import {Behavior} from '../../models/behavior';
import {Moment} from 'moment';
import {AbstractTimeInstanceField} from '../../time-instance-abstract-field/models/abstract-time-instance-field';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';

export class DateField extends AbstractTimeInstanceField {

    constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.DATE + this.getComponentType();
    }

    protected valueEquality(a: Moment, b: Moment): boolean {
        return AbstractTimeInstanceField.isEqual(a, b, 'day');
    }
}
