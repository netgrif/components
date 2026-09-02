/**
 * Object from Backend
 *
 * Authority: ROLE_USER | ROLE_ADMIN | ROLE_SYSTEMADMIN | Custom Role
 */
export interface Authority {
    name: string;
    authority: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_SYSTEMADMIN' | string;
}
