import {FilterMetadataAllowedNets} from '../../search/models/persistance/filter-metadata-allowed-nets';
import {Component} from '../../data-fields/models/component';

/**
 * Represents a value featured on a panel
 */
export interface FeaturedValue {
    value: string;
    rawValue?: unknown;
    icon: string;
    type: string;
    component?: Component;
    /**
     * Only for immediate filter fields
     */
    filterMetadata?: FilterMetadataAllowedNets;
}
