export interface Permissions {
    [k: string]: Permission;
}

export interface UsersPermissions {
    [k: string]: Permission;
}

export type Permission = {
    [k in PermissionType]: boolean;
};

export enum PermissionType {
    CREATE = 'create',
    DELETE = 'delete',
    VIEW = 'view'
}
