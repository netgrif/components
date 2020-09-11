import {DataField} from '../../data-fields/models/abstract-data-field';
import {TaskContentElementType} from './task-content-element-type';

export interface DatafieldGridLayoutElement {
    title?: string;
    gridAreaId: string;
    type: TaskContentElementType;
    item?: DataField<unknown>;
    alignment?: string;
}
