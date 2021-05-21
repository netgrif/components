import {InjectionToken} from '@angular/core';
import {Case} from '../../resources/interface/case';

/**
 * Holds a filter process instance
 */
export const NAE_FILTER_CASE = new InjectionToken<Case>('NaeFilterCase');
