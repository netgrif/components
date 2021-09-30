import {DataField} from '../../data-fields/models/abstract-data-field';
import {DataGroupLayout} from './data-group-layout';

/**
 * Object from Backend
 */
export interface DataGroup {
    /**
     * Array [DataField]{@link DataField}
     */
    fields: Array<DataField<any>>;
    /**
     * Name datagroup
     */
    title: string;
    /**
     * Desing alignment
     * ***Example:*** start
     */
    alignment: DataGroupAlignment;
    /**
     * Desing stretch
     *
     * ***Example:*** true
     */
    stretch: boolean;
    layout?: DataGroupLayout;

    /**
     * String id of parent task, only set if dataGroup is loaded by {@link TaskRefField}
     */
    parentTaskId?: string;

    /**
     * String id of parent case, only set if dataGroup is loaded by {@link TaskRefField}
     */
    parentCaseId?: string;
}

/**
 * Determines the position of the last data field when the number of data fields in a data group is odd.
 */
export enum DataGroupAlignment {
    /**
     * Positioned in the left column
     */
    START = 'start',
    /**
     * Positioned in the center of the screen
     */
    CENTER = 'center',
    /**
     * Positioned in the right column
     */
    END = 'end'
}
