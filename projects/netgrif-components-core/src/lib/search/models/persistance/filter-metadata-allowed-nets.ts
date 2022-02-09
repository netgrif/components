import {FilterMetadata} from './filter-metadata';

/**
 * The bare minimum of information necessary for the reconstruction of a saved filter
 */
export interface FilterMetadataAllowedNets {
    /**
     * Allowed nets used to create the filter
     */
    allowedNets: Array<string>;
    /**
     * Serialized advanced search state of the saved filter
     */
    filterMetadata: FilterMetadata;
}
