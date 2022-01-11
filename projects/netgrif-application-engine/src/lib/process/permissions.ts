export interface Permissions {
    [k: string]: Permission;
}

export interface UserPermissions {
    [k: string]: Permission;
}

export interface UserRefs {
    [k: string]: Permission;
}

export interface Permission {
    create?: boolean;
    delete?: boolean;
    view?: boolean;
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
    ASSIGN = 'assign',
    CANCEL = 'cancel',
    FINISH = 'finish',
    DELEGATE = 'delegate',
    SET = 'set'
}
