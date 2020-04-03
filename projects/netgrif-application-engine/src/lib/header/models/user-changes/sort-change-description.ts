import {HeaderColumnType} from '../header-column';
import {SortDirection} from '@angular/material';

/**
 * Definition of emitted data when user changes sort mode on column
 */
export interface SortChangeDescription {
    fieldIdentifier: string;
    sortDirection: SortDirection;
    columnType: HeaderColumnType;
    petriNetIdentifier?: string;
}
