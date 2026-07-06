import {HeaderColumn, HeaderColumnType} from "./header-column";
import {CaseMetaField} from "../case-header/case-menta-enum";
import {TaskMetaField} from "../task-header/task-meta-enum";
import {WorkflowMetaField} from "../workflow-header/workflow-meta-enum";

// todo 2454 doc
export function getCaseMetaHeaders(): HeaderColumn[] {
    return [
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'headers.caseMeta.visualID', 'text'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.MONGO_ID, 'headers.caseMeta.mongoID', 'text', false),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'headers.caseMeta.title', 'text'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'headers.caseMeta.author', 'user'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.CREATION_DATE, 'headers.caseMeta.creationDate', 'date'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.PROCESS_IDENTIFIER, 'headers.caseMeta.processIdentifier', 'text'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.PETRI_NET_ID, 'headers.caseMeta.petriNetId', 'text'),
    ];
}

// todo 2454 doc
export function getTaskMetaHeaders(): HeaderColumn[] {
    return [
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'headers.taskMeta.case', 'text'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE_ID, 'headers.taskMeta.caseID', 'text', false),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.TASK_ID, 'headers.taskMeta.taskID', 'text', false),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'headers.caseMeta.title', 'text'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'headers.taskMeta.priority', 'enumeration'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'headers.taskMeta.user', 'text'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.ASSIGN_DATE, 'headers.taskMeta.assignDate', 'date'),
    ];
}

// todo 2454 doc
export function getWorkflowMetaHeaders(): HeaderColumn[] {
    return [
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'headers.workflowMeta.initials', 'text'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'headers.workflowMeta.title', 'text'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.NET_ID, 'headers.workflowMeta.netId', 'text', false),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'headers.workflowMeta.version', 'text'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'headers.workflowMeta.author', 'text'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.CREATION_DATE, 'headers.workflowMeta.creationDate', 'date'),
    ];
}
