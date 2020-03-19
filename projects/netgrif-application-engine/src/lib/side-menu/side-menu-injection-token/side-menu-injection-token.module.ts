import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SideMenuInjectionTokenModule { }

export const NAE_SIDE_MENU_DATA = new InjectionToken<any>('NaeSideMenuData');
