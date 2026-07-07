import {TaskSearchRequestBody} from "netgrif-components-core";

export interface TaskViewDialogInjectionData {
    searchBody: TaskSearchRequestBody;
    autoCloseOnEvent: boolean;
}
