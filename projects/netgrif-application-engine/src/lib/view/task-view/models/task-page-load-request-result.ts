import {TaskPanelData} from '../../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskPageLoadRequestContext} from './task-page-load-request-context';

/**
 * Holds the information returned by a task page load request alongside the context of the request.
 */
export interface TaskPageLoadRequestResult {
    /**
     * Keys are task `stringId`s
     */
    tasks: { [k: string]: TaskPanelData };
    requestContext: TaskPageLoadRequestContext;
}
