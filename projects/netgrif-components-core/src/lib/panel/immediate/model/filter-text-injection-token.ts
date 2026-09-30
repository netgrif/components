import {InjectionToken} from '@angular/core';
import {FilterType} from "../../../filter/models/filter-type";

export interface FilterTextConfiguration {
    query: string;
    type: FilterType;
    ellipsis: boolean;
}

/**
 * Provides necessary data for the display of immediate filter fields on panels
 */
export const NAE_FILTER_TEXT = new InjectionToken<FilterTextConfiguration>('NaeFilterText');
