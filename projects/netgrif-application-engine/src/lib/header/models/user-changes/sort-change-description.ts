import {HeaderColumnType} from '../header-column';

/**
 * Definition of emitted data when user changes sort mode on column
 */
export interface SortChangeDescription {
    columnId: string;
    identifier: string;
    title: string;
    sortMode: string;
    type: HeaderColumnType;
}
