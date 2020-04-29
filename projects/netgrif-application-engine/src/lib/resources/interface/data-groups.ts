import {Fields} from './fields';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {DataGroupLayout} from './data-group-layout';

export interface DataGroupsResource {
    fields: Fields;
    title: string;
    alignment: string;
    stretch: boolean;
    layout?: DataGroupLayout;
}

export interface DataGroup {
    fields: Array<DataField<any>>;
    title: string;
    alignment: string;
    stretch: boolean;
    layout?: DataGroupLayout;
}
