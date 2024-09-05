import {LayoutObjectType} from '../types/layout-object-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {LayoutContainer} from './layout-container';
import {LayoutObjectProperties} from './layout-object-properties';

export interface LayoutItem {
    layoutType: LayoutObjectType;
    dataRefId: string;
    field: DataField<any>;
    container: LayoutContainer;
    properties: LayoutObjectProperties;
}
