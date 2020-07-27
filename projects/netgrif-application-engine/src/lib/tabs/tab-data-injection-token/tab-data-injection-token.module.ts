import {InjectionToken} from '@angular/core';
import {InjectedTabData} from '../interfaces';

/**
 * Injection token for injection of {@link InjectedTabData} into tabs in {@link TabView}.
 *
 * Also see {@link TabContent} for more information.
 */
export const NAE_TAB_DATA = new InjectionToken<InjectedTabData>('NaeTabData');
