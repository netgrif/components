import {Authority} from './authority';

/**
 * Object from Backend
 */
export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    surname: string;
    fullName: string;
    /**
     * Array [Group]{@link Group}
     */
    groups?: Array<Group>;
    /**
     * Array [Authority]{@link Authority}
     */
    authorities: Array<Authority>;
    /**
     * Array [ProcessRole]{@link ProcessRole}
     */
    processRoles: Array<ProcessRole>;
    /**
     * Array [UserProcessRole]{@link UserProcessRole}
     */
    userProcessRoles?: Array<UserProcessRole>;
    _links: any;

}

/**
 * Object from Backend
 */
export interface Group {
    id: number;
    members: Array<any>;
    childGroups: Array<any>;
}

/**
 * Object from Backend
 */
export interface ProcessRole {
    /**
     * Process ID - Process Mongo ID
     *
     * ***Example:*** 5e43f69c0a975a7f87551089
     */
    stringId: string;
    /**
     * Process Name
     *
     * ***Example:*** Klient
     */
    name?: string;
    /**
     * Process Description
     */
    description?: string;
}

/**
 * Object from Backend
 *
 * ***Example:***
 *
 *    {
 *     "roleId": "5e43f6aa0a975a7f87551bf8",
 *     "netId": "5e43f6aa0a975a7f87551bf7"
 *    }
 */
export interface UserProcessRole {
    /**
     * Role ID - Role Mongo ID
     *
     * ***Example:*** 5e43f6aa0a975a7f87551bf8
     */
    roleId: string;
    /**
     * Net ID - Net Mongo ID
     *
     * ***Example:*** 5e43f6aa0a975a7f87551bf7
     */
    netId?: string;
}
