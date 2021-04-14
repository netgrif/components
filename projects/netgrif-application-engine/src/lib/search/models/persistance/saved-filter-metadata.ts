import {FilterMetadata} from './filter-metadata';

/**
 * All the necessary data for full reconstruction of a saved filter
 */
export interface SavedFilterMetadata {
    allowedNets: Array<string>;
    filterMetadata: FilterMetadata;
}
