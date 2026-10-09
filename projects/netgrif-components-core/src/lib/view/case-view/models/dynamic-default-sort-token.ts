import {InjectionToken} from '@angular/core';
import {SortingHeader} from '../../../resources/interface/sorting-header';

/**
 * Default sorting of the view, that is used when the user has no sorting stored in his preferences.
 *
 * Each {@link SortingHeader} references a header column by its unique id (e.g. `meta-title` or `<processIdentifier>-<fieldId>`).
 * The order of the array defines the sorting priority.
 */
export const NAE_DYNAMIC_DEFAULT_SORT = new InjectionToken<Array<SortingHeader>>('NaeDynamicDefaultSort');
