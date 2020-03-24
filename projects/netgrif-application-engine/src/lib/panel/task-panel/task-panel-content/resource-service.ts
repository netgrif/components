import {Behavior} from '../../../data-fields/models/behavior';
import {Layout, Validation} from '../../../data-fields/models/abstract-data-field';

export interface DataFieldResource {
    stringId: string;
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    behavior: Behavior;
    layout?: Layout;
    order: number;
    value?: string | number | string[] | boolean | Array<number>;
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

export interface DataGroupResource {
    fields: DataFieldResource[];
    title: string;
    alignment: string;
    stretch: boolean;
    cols?: number;
}
