import {Fields} from './fields';
import {DataField} from '../../data-fields/models/abstract-data-field';

/**
 * Object from Backend
 */
export interface DataGroupsResource {
    fields: Fields;
    title: string;
    alignment: string;
    stretch: boolean;
    cols?: number;
}

/**
 * Object from Backend
 */
export interface DataGroup {
    fields: Array<DataField<any>>;
    title: string;
    alignment: string;
    stretch: boolean;
    cols?: number;
}
