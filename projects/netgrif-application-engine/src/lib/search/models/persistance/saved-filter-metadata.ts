import {Filter} from '../../../filter/models/filter';
import {Case} from '../../../resources/interface/case';
import {FilterMetadataAllowedNets} from './filter-metadata-allowed-nets';

/**
 * All the necessary data for full reconstruction of a saved filter
 */
export interface SavedFilterMetadata extends FilterMetadataAllowedNets {
    /**
     * The view ID of the view the filter was created in
     */
    originViewId: string;
    /**
     * The filter object represented by the provided metadata
     */
    filter: Filter;
    /**
     * The filter's case object.
     *
     * Only present if the filter is loaded. When the filter is saved onle the case id is returned
     */
    filterCase?: Case;
    /**
     * ID of the filter's case.
     */
    filterCaseId: string;
}
