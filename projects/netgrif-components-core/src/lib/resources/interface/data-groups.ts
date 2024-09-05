import {DataField} from '../../data-fields/models/abstract-data-field';

/**
 * Object from Backend
 */
export interface DataGroup extends ParentDataGroupInformation{
    /**
     * Array [DataField]{@link DataField}
     */
    fields: Array<DataField<any>>;
    /**
     * Name of the data group
     */
    title?: string;
}

/**
 * An object containing the information about the parent of a data group
 */
export interface ParentDataGroupInformation {
    /**
     * String id of parent task, only set if dataGroup is loaded by {@link TaskRefField}
     */
    parentTaskId?: string;
    /**
     * String id of parent task, only set if dataGroup is loaded by {@link TaskRefField}
     */
    parentTransitionId?: string;
    /**
     * String id of parent case, only set if dataGroup is loaded by {@link TaskRefField}
     */
    parentCaseId?: string;
    /**
     * String id of the parent task ref. Only set if the data group is loaded via a {@link TaskRefField}
     */
    parentTaskRefId?: string;
    /**
     * Level of nesting in a task reffed data group. Only set if the data group is loaded via a {@link TaskRefField}
     */
    nestingLevel?: number;
}
