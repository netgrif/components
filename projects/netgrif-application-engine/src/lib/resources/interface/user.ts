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
    groups?: Array<Group>;
    authorities: Array<Authority>;
    processRoles: Array<ProcessRole>;
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
    stringId: string;
    name?: string;
    description?: string;
}

/**
 * Object from Backend
 */
export interface UserProcessRole {
    roleId: string;
}
