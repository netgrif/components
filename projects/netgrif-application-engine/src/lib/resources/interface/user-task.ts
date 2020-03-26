import {Authority} from './authority';
import {UserProcessRole} from './user-process-role';

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
