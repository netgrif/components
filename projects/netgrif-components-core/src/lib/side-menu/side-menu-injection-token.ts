import {InjectionToken} from '@angular/core';
import {SideMenuControl} from './models/side-menu-control';

/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_SIDE_MENU_CONTROL = new InjectionToken<SideMenuControl>('NaeSideMenuControl');
