import {FilterMetadataAllowedNets} from '../../search/models/persistance/filter-metadata-allowed-nets';

/**
 * Represents a value featured on a panel
 */
export interface FeaturedValue {
    value: string;
    icon?: string;
    type: string;
    /**
     * Only for immediate filter fields
     */
    filterMetadata?: FilterMetadataAllowedNets;
}
