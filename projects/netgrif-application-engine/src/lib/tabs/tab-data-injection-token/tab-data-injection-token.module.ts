import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InjectedTabData} from '../interfaces';

/**
 * Declares the `NAE_TAB_DATA` injection token.
 */
@NgModule({
  imports: [
    CommonModule
  ]
})
export class TabDataInjectionTokenModule { }

export const NAE_TAB_DATA = new InjectionToken<InjectedTabData>('NaeTabData');
