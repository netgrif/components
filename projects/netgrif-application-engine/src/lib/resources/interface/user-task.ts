import {Authority, UserProcessRole} from './task';

export interface UserTask {
    email: string;
    name: string;
    surname: string;
    state: string;
    authorities: Array<Authority>;
    userProcessRoles: Array<UserProcessRole>;
    processRoles: [];
    groups: [];
    fullName: string;
    registered: boolean;
}
