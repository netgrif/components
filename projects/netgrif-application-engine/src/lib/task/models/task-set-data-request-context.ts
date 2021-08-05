import {TaskSetDataRequestBody} from '../../resources/interface/task-set-data-request-body';

/**
 * Holds the information about a `setData` request, alongside with the previous values,
 * so that a queued request can be reverted, if it fails.
 */
export interface TaskSetDataRequestContext {
    body: TaskSetDataRequestBody;
    previousValues: {
        [fieldId: string]: any;
    };
}
