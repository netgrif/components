export interface Permissions {
    [k: string]: Permission;
}

export interface UsersPermissions {
    [k: number]: Permission;
}

export interface Permission {
    create?: boolean;
    delete?: boolean;
}

export enum PermissionType {
    CREATE = 'create',
    DELETE = 'delete'
}
