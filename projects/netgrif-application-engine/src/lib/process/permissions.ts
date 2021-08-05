export interface Permissions {
    [k: string]: Permission;
}

export interface UsersPermissions {
    [k: number]: Permission;
}

export interface Permission {
    create?: boolean;
    delete?: boolean;
    view?: boolean;
}

export enum PermissionType {
    CREATE = 'create',
    DELETE = 'delete',
    VIEW = 'view'
}
