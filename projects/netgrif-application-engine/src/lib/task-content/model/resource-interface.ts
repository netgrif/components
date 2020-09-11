import {Behavior} from '../../data-fields/models/behavior';
import {Layout} from '../../data-fields/models/layout';
import {Validation} from '../../data-fields/models/validation';
import {FieldTypeResource} from './field-type-resource';

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
    view?: {
        value: string;
    };
    minValue?: number;
    minDate?: string;
    validations?: Validation[];
    subType?: string;
    formatting?: string;
    roles?: any[];
    options?: {
        [k: string]: string
    };
}
