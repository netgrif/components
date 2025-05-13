export interface Permissions {
    [k: string]: Permission;
}

export interface Permission {
    create?: boolean;
    delete?: boolean;
    view?: boolean;
    viewDisabled?: boolean;
    assign?: boolean;
    assigned?: boolean;
    cancel?: boolean;
    finish?: boolean;
    delegate?: boolean;
    set?: boolean;
}

export enum PermissionType {
    CREATE = 'create',
    DELETE = 'delete',
    VIEW = 'view',
    VIEW_DISABLED = 'view_disabled',
    ASSIGN = 'assign',
    CANCEL = 'cancel',
    FINISH = 'finish',
    DELEGATE = 'delegate',
    SET = 'set'
}
