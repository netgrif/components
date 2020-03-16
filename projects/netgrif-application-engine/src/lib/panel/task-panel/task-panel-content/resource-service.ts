import {Behavior} from '../../../data-fields/models/behavior';

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
    validationJS?: string;
    validationErrors?: any;
    subType?: string;
    formatting?: string;
    roles?: any[];
}
