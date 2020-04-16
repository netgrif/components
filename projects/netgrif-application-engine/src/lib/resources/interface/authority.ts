/**
 * Object from Backend
 */
export interface Authority {
    /**
     * Spring Boot Role
     *
     * **Example:** ROLE_SYSTEMADMIN
     */
    authority: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_SYSTEMADMIN' | string;
}
