import {FilterMetadata} from '../../search/models/persistance/filter-metadata';
import {DataFieldResource} from "../../task-content/model/resource-interfaces";

/**
 * Describes request body for task setData endpoint.
 *
 * This object is a raw request body for [setData()]{@link TaskResourceService#setData} method in {@link TaskResourceService}.
 */
export interface TaskDataSets {

    /**
     * ID of task, on which changes occurred
     */
    tasks: {
        [taskId: string]: DataSet
    };
}

export interface DataSet {

    /**
     * ID of the field that changed its value
     */
    fields: {
        [fieldId: string]: DataFieldResource
    }
}

