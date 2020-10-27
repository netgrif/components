import {Behavior} from '../../data-fields/models/behavior';
import {Layout} from '../../data-fields/models/layout';
import {Validation} from '../../data-fields/models/validation';
import {FieldTypeResource} from './field-type-resource';
import {Component} from '../../data-fields/models/component';

export interface DataFieldResource {
    stringId: string;
    type: FieldTypeResource;
    name: string;
    description?: string;
    placeholder?: string;
    behavior: Behavior;
    layout?: Layout;
    order: number;
    value?: string | number | string[] | boolean | Array<number> | any;
    defaultValue?: string | number | string[] | boolean;
    choices?: string[];
    /*@deprecated*/
    view?: {
        /*@deprecated*/
        value: string;
    };
    minValue?: number;
    minDate?: string;
    validations?: Validation[];
    component?: Component;
    subType?: string;
    /*@deprecated*/
    formatting?: string;
    roles?: any[];
    options?: {
        [k: string]: string
    };
}
