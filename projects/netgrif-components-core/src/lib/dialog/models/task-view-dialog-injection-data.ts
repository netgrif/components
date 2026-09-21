import {TaskSearchRequestBody} from '../../filter/models/task-search-request-body';

export interface TaskViewDialogInjectionData {
    searchBody: TaskSearchRequestBody;
    autoCloseOnEvent: boolean;
}
