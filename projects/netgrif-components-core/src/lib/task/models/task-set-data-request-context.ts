import {TaskDataSets} from '../../resources/interface/task-data-sets';

/**
 * Holds the information about a `setData` request, alongside with the previous values,
 * so that a queued request can be reverted, if it fails.
 */
export interface TaskSetDataRequestContext {
    body: TaskDataSets;
    previousValues: {
        [fieldId: string]: any;
    };
}
