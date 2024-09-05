import {LayoutObjectType} from '../types/layout-object-type';
import {LayoutItem} from './layout-item';
import {LayoutObjectProperties} from './layout-object-properties';

export interface LayoutContainer {
    layoutType: LayoutObjectType;
    items: Array<LayoutItem>;
    properties: LayoutObjectProperties;
    hasData: boolean;
    parentTaskId?: string;
    parentTransitionId?: string;
    parentCaseId?: string;
}
