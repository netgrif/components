import {AbstractDataField} from '../../../data-fields/models/abstract-data-field';
import {GridElementWithItem} from '../../../utility/grid-layout/model/grid-element-with-item';

export interface DatafieldGridLayoutElement extends GridElementWithItem {
    item: AbstractDataField<any>;
    title?: string;
}
