import {DataField} from '../../../data-fields/models/abstract-data-field';
import {GridItem} from '../../../data-fields/models/grid-item';

export interface DatafieldGridLayoutElement extends GridItem{
    item: DataField<any>;
    type: string;
    title?: string;
}
