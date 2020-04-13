import {Authority} from './authority';

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

export interface Group {
    id: number;
    members: Array<any>;
    childGroups: Array<any>;
}

export interface ProcessRole {
    stringId: string;
    name?: string;
    description?: string;
}

export interface UserProcessRole {
    roleId: string;
}
