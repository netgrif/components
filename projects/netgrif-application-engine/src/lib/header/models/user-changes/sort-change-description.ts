import {HeaderColumnType} from '../header-column';
import {SortDirection} from '@angular/material/sort';
import {ColumnHeaderChange} from './column-header-change';

/**
 * Definition of emitted data when user changes sort mode on column
 */
export interface SortChangeDescription extends ColumnHeaderChange {
    fieldIdentifier: string;
    sortDirection: SortDirection;
    columnType: HeaderColumnType;
    fieldType: string;
    petriNetIdentifier?: string;
}
