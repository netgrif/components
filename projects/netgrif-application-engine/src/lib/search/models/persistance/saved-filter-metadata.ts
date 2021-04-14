import {FilterMetadata} from './filter-metadata';
import {Filter} from '../../../filter/models/filter';

/**
 * All the necessary data for full reconstruction of a saved filter
 */
export interface SavedFilterMetadata {
    allowedNets: Array<string>;
    filterMetadata: FilterMetadata;
    /**
     * The filter object represented by the provided metadata
     */
    filter: Filter;
}
