import {InjectionToken} from '@angular/core';
import {Filter} from './filter';

/**
 * Used for providing any additional constraints to the filter case filtering, when
 * user filters are loaded via the {@link UserFiltersService}.
 *
 * The provided filter must be of type `Case` as it is used for the filtering of cases representing saved user filters.
 */
export const NAE_FILTERS_FILTER = new InjectionToken<Filter>('NaeFiltersFilter');
