export interface  CreateViewArguments {
    path: string;
    viewType: string;
    layoutParams?: { [k: string]: any; };
    componentName?: string;
    customImportPath?: string;
    access: { [k: string]: any; } | ('public' | 'private');
    enableCaseTitle?: boolean;
    isCaseTitleRequired?: boolean;
    showDeleteMenu?: boolean;
    confirmWorkflowDeletion?: boolean;
}
