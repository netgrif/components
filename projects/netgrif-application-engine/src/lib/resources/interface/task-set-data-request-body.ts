import {FilterMetadata} from '../../search/models/persistance/filter-metadata';

/**
 * Describes request body for task setData endpoint.
 *
 * This object is a raw request body for [setData()]{@link TaskResourceService#setData} method in {@link TaskResourceService}.
 */
export interface TaskSetDataRequestBody {

    /**
     * ID of task, on which changes occurred
     */
    [taskId: string]: TaskSetDataRequestFields;
}

export interface TaskSetDataRequestFields {

    /**
     * ID of the field that changed it's value
     */
    [fieldId: string]: {
        /**
         * type of the changed field
         */
        type: string;
        /**
         * new value
         */
        value?: any;
        /**
         * new `allowed nets` (for field types that support this)
         */
        allowedNets?: ReadonlyArray<string>;
        /**
         * new `filterMetadata` (for field types that support this)
         */
        filterMetadata?: FilterMetadata;
    };
}

