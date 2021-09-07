import {BasicLayout} from '../../utility/grid-layout/model/grid-element';


export interface DataGroupLayout extends BasicLayout {
    type: DataGroupLayoutType;
    hideEmptyRows?: boolean;
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
