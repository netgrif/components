import {InjectionToken} from '@angular/core';
import {FeaturedValue} from '../abstract/featured-value';

export interface PanelItemPortalData {
    featuredValue: FeaturedValue;
    textEllipsis: boolean;
}

export const NAE_PANEL_ITEM_DATA = new InjectionToken<PanelItemPortalData>('NaePanelItemData');
