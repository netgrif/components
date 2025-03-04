import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component, ComponentPrefixes, DEFAULT} from '../../models/component';
import {Validation} from '../../models/validation';
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export class ButtonField extends DataField<number> {

    constructor(stringId: string, title: string, behavior: Behavior, value?: number, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector) {
        super(stringId, title, (value === undefined) ? 0 : value, behavior, placeholder, description,
            layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.BUTTON + DEFAULT;
    }
}
