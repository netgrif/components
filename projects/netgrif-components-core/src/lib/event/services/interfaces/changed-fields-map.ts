import {ChangedFields} from '../../../data-fields/models/changed-fields';

export interface ChangedFieldsMap {
    [caseId: string]: {
        [taskId: string]: ChangedFields
    };
}
