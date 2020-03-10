import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InjectedTabData} from '../interfaces';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TabDataInjectionTokenModule { }

export const NAE_TAB_DATA = new InjectionToken<InjectedTabData>('NaeTabData');
