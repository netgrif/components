import {InjectionToken} from '@angular/core';
import {FilterMetadataAllowedNets} from '../../../search/models/persistance/filter-metadata-allowed-nets';

/**
 * Provides necessary data for the display of immediate filter fields on panels
 */
export const NAE_FILTER_TEXT = new InjectionToken<FilterMetadataAllowedNets>('NaeFilterText');
