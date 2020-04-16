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

/**
 * Injection token for injection of {@link InjectedTabData} into tabs in {@link TabView}.
 *
 * Also see {@link TabContent} for more information.
 */
export const NAE_TAB_DATA = new InjectionToken<InjectedTabData>('NaeTabData');
