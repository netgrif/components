import {Behavior} from '../../models/behavior';
import {Moment} from 'moment';
import {AbstractTimeInstanceField} from '../../time-instance-abstract-field/models/abstract-time-instance-field';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {ValidationRegistryService} from '../../../registry/validation/validation-registry.service';
import {Injector} from "@angular/core";

export class DateTimeField extends AbstractTimeInstanceField {

    constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector, ) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, validationRegistry, injector);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.DATE_TIME + this.getComponentType();
    }

    protected valueEquality(a: Moment, b: Moment): boolean {
        return AbstractTimeInstanceField.isEqual(a, b, 'minute');
    }
}
