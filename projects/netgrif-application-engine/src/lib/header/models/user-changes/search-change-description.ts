import {HeaderColumnType} from '../header-column';
import {ColumnHeaderChange} from './column-header-change';

/**
 * Definition of emitted data when user types in search input
 */
export interface SearchChangeDescription extends ColumnHeaderChange {
    fieldIdentifier: string;
    fieldType: string;
    fieldTitle: string;
    searchInput: any;
    type: HeaderColumnType;
    petriNetIdentifier?: string;
}
