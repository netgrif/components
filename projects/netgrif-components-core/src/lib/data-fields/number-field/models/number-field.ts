import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {FormatFilter} from '../../models/format-filter';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {ValidationRegistryService} from '../../../registry/validation/validation-registry.service';
import {Injector} from "@angular/core";

export class NumberField extends DataField<number> {
    public _formatFilter: FormatFilter;

    constructor(
                stringId: string, title: string, value: number, behavior: Behavior, validations?: Array<Validation>, placeholder?: string,
                description?: string, layout?: Layout, format?: FormatFilter, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector,) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
        this._formatFilter = format;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.NUMBER + this.getComponentType();
    }

}
