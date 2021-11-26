export interface Permissions {
    [k: string]: Permission;
}

export interface UserPermissions {
    [k: number]: Permission;
}

export interface UserRefs {
    [k: number]: Permission;
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
}

export enum PermissionType {
    CREATE = 'create',
    DELETE = 'delete',
    VIEW = 'view',
    ASSIGN = 'assign',
    CANCEL = 'cancel',
    FINISH = 'finish',
    DELEGATE = 'delegate'
}
