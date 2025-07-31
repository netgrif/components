import {NavigationItem} from './navigation-configs';
import {UriNodeResource} from './uri-resource';

export interface MenuStateChangeEvent {
    menu: 'left' | 'right';
    isOpened: boolean;
}

export interface MenuItemClickEvent {
    path: string;
    isHome: boolean;
}

export interface MenuItemLoadedEvent {
    menu: 'left' | 'right';
    items: Array<NavigationItem>;
}

export interface MenuResizeEvent {
    width: number;
}
