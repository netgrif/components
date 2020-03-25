import {Behavior} from '../../../data-fields/models/behavior';
import {Validation} from '../../../data-fields/models/abstract-data-field';

export interface DataFieldResource {
    stringId: string;
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    behavior: Behavior;
    layout: {
        x: number,
        y: number,
        cols: number,
        rows: number
    };
    order: number;
    value?: string | number | string[] | boolean;
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
