import {Behavior} from '../../../data-fields/models/behavior';
import {Layout, Validation} from '../../../data-fields/models/abstract-data-field';
import {UserValue} from '../../../data-fields/user-field/models/user-value';

export interface DataFieldResource {
    stringId: string;
    type: string;
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
}
