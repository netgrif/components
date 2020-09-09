import {BasicLayout} from '../../utility/grid-layout/model/grid-element';
import {FieldAlignment} from './field-alignment';


export interface TaskLayout extends BasicLayout {
    offset: number;
    type: TaskLayoutType;
    fieldAlignment: FieldAlignment;
    [k: string]: any;
}

/**
 * Determines what type of layouting algorithm should be used to position data fields in the task
 */
export enum TaskLayoutType {
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
