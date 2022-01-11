import {Filter} from '../../filter/models/filter';
import {Observable} from 'rxjs';
import {FilterType} from '../../filter/models/filter-type';

/**
 * Provides information about a {@link SearchService}s base filter
 */
export interface BaseFilter {
    /**
     * A constant base filter or a variable base filter.
     *
     * If the base filter is provided in the form of an `Observable` the [filterType]{@link BaseFilter#filterType} attribute must be set.
     */
    filter: Filter | Observable<Filter>;
    /**
     * Type of the filters provided in the `Observable` base filter
     */
    filterType?: FilterType;
}
