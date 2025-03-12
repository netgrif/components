import {Behavior} from '../../data-fields/models/behavior';
import {Layout} from '../../data-fields/models/layout';
import {Validation} from '../../data-fields/models/validation';
import {FieldTypeResource} from './field-type-resource';
import {FormatFilter} from '../../data-fields/models/format-filter';
import {Component} from '../../data-fields/models/component';
import {FilterMetadata} from '../../search/models/persistance/filter-metadata';
import {DataGroupLayout} from '../../resources/interface/data-group-layout';
import {DataGroupAlignment} from '../../resources/interface/data-groups';

export interface DataGroupResource {
    data: Array<string>;
    dataRefs: Map<string, DataRefResource>;
    layout: DataGroupLayout;
    title: string;
    alignment: DataGroupAlignment;
    stretch: boolean;
    parentTaskId: string;
    parentTransitionId: string;
    parentCaseId: string;
    parentTaskRefId: string;
    nestingLevel: string;
}

export interface DataRefResource {
    fieldId: string;
    field: DataFieldResource;
    behavior: Behavior;
    layout: Layout;
    component: Component;
    parentTaskId: string;
    parentCaseId: string;
}

export interface DataFieldValue {
    value: any;
}

export interface DataFieldResource {
    stringId: string;
    type: FieldTypeResource;
    name: string;
    description?: string;
    placeholder?: string;
    behavior?: Behavior;
    value?: DataFieldValue;
    defaultValue?: unknown;
    choices?: Array<string>;
    minValue?: number;
    minDate?: string;
    validations?: Array<Validation>;
    component?: Component;
    subType?: string;
    /*@deprecated*/
    formatting?: string;
    formatFilter?: FormatFilter;
    roles?: Array<any>;
    options?: {
        [k: string]: string
    };
    allowedNets?: Array<string>;
    filterMetadata?: FilterMetadata;
    parentTaskId?: string;
}
