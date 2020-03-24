import {Fields} from './fields';
import {DataField} from '../../data-fields/models/abstract-data-field';

export interface DataGroupsResource {
    fields: Fields;
    title: string;
    alignment: string;
    stretch: boolean;
    cols?: number;
}

export interface DataGroup {
    fields: DataField<any>[];
    title: string;
    alignment: string;
    stretch: boolean;
    cols?: number;
}

