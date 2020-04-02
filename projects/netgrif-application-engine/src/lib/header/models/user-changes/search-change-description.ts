import {HeaderColumnType} from '../header-column';

/**
 * Definition of emitted data when user types in search input
 */
export interface SearchChangeDescription {
    columnId: string;
    identifier: string;
    title: string;
    searchQuery: string;
    type: HeaderColumnType;
}
