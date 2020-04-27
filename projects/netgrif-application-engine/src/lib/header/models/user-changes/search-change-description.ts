import {HeaderColumnType} from '../header-column';

/**
 * Definition of emitted data when user types in search input
 */
export interface SearchChangeDescription {
    fieldIdentifier: string;
    searchInput: any;
    type: HeaderColumnType;
    petriNetIdentifier?: string;
}
