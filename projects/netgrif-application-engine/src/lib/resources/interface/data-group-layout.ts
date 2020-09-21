import {BasicLayout} from '../../utility/grid-layout/model/grid-element';


export interface DataGroupLayout extends BasicLayout {
    type: DataGroupLayoutType;
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
