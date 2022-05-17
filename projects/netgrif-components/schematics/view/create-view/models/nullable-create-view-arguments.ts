import {CreateViewArguments} from '../../create-view-prompt/models/create-view-arguments';

export interface NullableCreateViewArguments {
    path: CreateViewArguments['path'] | undefined;
    viewType: CreateViewArguments['viewType'] | undefined;
    componentName: CreateViewArguments['componentName'] | undefined;
    customImportPath?: CreateViewArguments['customImportPath'];
    layoutParams?: CreateViewArguments['layoutParams'];
    access: CreateViewArguments['access'] | undefined;
    enableCaseTitle?: CreateViewArguments['enableCaseTitle'];
    isCaseTitleRequired?: CreateViewArguments['enableCaseTitle'];
    showDeleteMenu?: CreateViewArguments['showDeleteMenu'];
    confirmWorkflowDeletion?: CreateViewArguments['confirmWorkflowDeletion'];
}
