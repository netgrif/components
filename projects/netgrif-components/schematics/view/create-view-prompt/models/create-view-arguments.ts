export interface  CreateViewArguments {
    path: string;
    viewType: string;
    layoutParams?: { [k: string]: any; };
    componentName?: string;
    customImportPath?: string;
    access: { [k: string]: any; } | ('public' | 'private' | Access);
    enableCaseTitle?: boolean;
    isCaseTitleRequired?: boolean;
    showDeleteMenu?: boolean;
    confirmWorkflowDeletion?: boolean;
}

export interface Access {
    /**
     * `string` and `Array<string>` types are deprecated and support for them will be removed in a future version.
     *
     *  For `string` values the format is: <net import id>.<role name>
     */
    role?: Array<string> | string | RoleAccess | Array<RoleAccess>;
    group?: Array<string> | string;
    authority?: Array<string> | string;

    [k: string]: any;
}

/**
 * Defines a single role access constraint
 */
export interface RoleAccess {
    /**
     * Process identifier (import ID)
     */
    processId: string;
    /**
     * Role import ID
     */
    roleId: string;
}
