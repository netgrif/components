import {MatDrawerMode} from '@angular/material/sidenav';
import {View} from '../../../commons/schema';
import {Case} from '../../resources/interface/case';

export interface ConfigDoubleMenu {
    mode: MatDrawerMode;
    opened: boolean;
    disableClose: boolean;
    width: number;
}

export interface NavigationItem extends View {
    id: string;
    resource?: Case;
}

export const MENU_IDENTIFIERS = [
    'preference_item',
];
export const SETTINGS_TRANSITION_ID = 'item_settings';

export const LEFT_DRAWER_DEFAULT_WIDTH = 60;
export const RIGHT_DRAWER_DEFAULT_WIDTH = 240;
export const RIGHT_DRAWER_DEFAULT_MIN_WIDTH = 180;
export const RIGHT_DRAWER_MAX_WIDTH = 460;
export const RIGHT_SIDE_NEW_PAGE_SIZE = 10
export const RIGHT_SIDE_INIT_PAGE_SIZE = 20

export enum MenuOrder {
    Ascending,
    Descending
}
