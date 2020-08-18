/**
 * Describes request body for task setData endpoint.
 *
 * This object is a raw request body for [setData()]{@link TaskResourceService#setData} method in {@link TaskResourceService}.
 */
export interface TaskSetDataRequestBody {
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
        value: any;
    };
}

