import {InjectionToken} from '@angular/core';

export interface FilterTextConfiguration {
    query: string;
    ellipsis: boolean;
}

/**
 * Provides necessary data for the display of immediate filter fields on panels
 */
export const NAE_FILTER_TEXT = new InjectionToken<FilterTextConfiguration>('NaeFilterText');
