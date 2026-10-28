/**
 * Object from Backend
 *
 * Authority: ROLE_USER | ROLE_ADMIN | ROLE_SYSTEMADMIN | Custom Role
 *
 * @deprecated
 */
export interface Authority {
    name: string;
    authority: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_SYSTEMADMIN' | string;
}
