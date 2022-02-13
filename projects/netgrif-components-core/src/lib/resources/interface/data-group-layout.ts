import {BasicLayout} from '../../utility/grid-layout/model/grid-element';


export interface DataGroupLayout extends BasicLayout {
    type: DataGroupLayoutType;
    hideEmptyRows?: DataGroupHideEmptyRows;
    compactDirection?: DataGroupCompact;
    [k: string]: any;
}

/**
 * Determines what type of layouting algorithm should be used to position data fields in the data group
 */
export enum DataGroupLayoutType {
    /**
     * A grid based on x, y co-ordinates and width and height of each field
     */
    GRID = 'grid',
    /**
     * Evenly sized fields that fill all columns
     */
    FLOW = 'flow',
    /**
     * Layouting algorithm used in NAE versions < 4.0.0
     */
    LEGACY = 'legacy'
}

/**
 * Determines what direction(s) should be used when compacting form layout
 */
export enum DataGroupCompact {
    /**
     * No field layout compacting occurs
     */
    NONE = 'none',
    /**
     * Fields are moved up as far as they can fit. Fields declared in the same row might end up in different rows.
     */
    UP = 'up',
}

/**
 * Determines which empty rows should be hidden in the final layout
 */
export enum DataGroupHideEmptyRows {
    /**
     * All empty rows are removed from the final layout
     */
    ALL = 'all',
    /**
     * Only rows completely freed by compacting fields are removed.
     *
     * That is any rows that are empty before the compacting takes place are kept in the final layout.
     * And any rows freed by compacting field (when using [DataGroupCompact.UP]{@link DataGroupCompact#UP})
     * are removed from the final layout.
     *
     * When fields are compacted upwards all empty rows are naturally moved to the bottom of the layout.
     * This option can be used to regulate the number of empty rows at the bottom to a constant number
     * (by keeping only intended empty rows).
     */
    COMPACTED = 'compacted',
    /**
     * All empty rows are kept in the final layout
     */
    NONE = 'none',
}
