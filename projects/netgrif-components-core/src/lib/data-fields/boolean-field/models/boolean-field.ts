import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {UpdateOnStrategy, UpdateStrategy} from "../../models/update-strategy";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export class BooleanField extends DataField<boolean> {

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.BOOLEAN + this.getComponentType();
    }

    public getUpdateOnStrategy(): UpdateOnStrategy {
        return UpdateStrategy.CHANGE;
    }
}
