import {FilterMetadata} from './filter-metadata';
import {Filter} from '../../../filter/models/filter';
import {Case} from '../../../resources/interface/case';

/**
 * All the necessary data for full reconstruction of a saved filter
 */
export interface SavedFilterMetadata {
    /**
     * Allowed nets used to create the filter
     */
    allowedNets: Array<string>;
    /**
     * Serialized advanced search state of the saved filter
     */
    filterMetadata: FilterMetadata;
    /**
     * The view ID of the view the filter was created in
     */
    originViewId: string;
    /**
     * The filter object represented by the provided metadata
     */
    filter: Filter;
    /**
     * The filter's case object
     */
    filterCase: Case;
}
