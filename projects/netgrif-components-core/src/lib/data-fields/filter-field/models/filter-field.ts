import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component, ComponentPrefixes} from '../../models/component';
import {FilterMetadata} from '../../../search/models/persistance/filter-metadata';
import {Validation} from '../../models/validation';
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export class FilterField extends DataField<string> {

    constructor(stringId: string, title: string, initialValue: string, private _filterMetadata: FilterMetadata,
                private _allowedNets: Array<string>, behavior: Behavior, placeholder: string, description: string, layout?: Layout,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector) {
        super(stringId, title, initialValue, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
    }

    get filterMetadata(): FilterMetadata {
        return this._filterMetadata;
    }

    get allowedNets(): Array<string> {
        return this._allowedNets;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.FILTER + this.getComponentType();
    }
}
