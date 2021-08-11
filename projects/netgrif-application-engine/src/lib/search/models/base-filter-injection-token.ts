import {InjectionToken} from '@angular/core';
import {BaseFilter} from './base-filter';

/**
 * Provides the base filter of a {@link SearchService}
 */
export const NAE_BASE_FILTER = new InjectionToken<BaseFilter>('NaeBaseFilter');
