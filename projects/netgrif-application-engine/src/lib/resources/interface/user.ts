import {Authority} from './authority';
import {IUser} from '../../user/models/iuser';
import {UserProcessRole} from './user-process-role';
import {ProcessRole} from './process-role';

/**
 * User Object
 */
export interface User extends IUser {
    /**
     * MySQL ID
     */
    id: string;
    /**
     * Email
     */
    email: string;
    /**
     * @ignore
     */
    password?: string;
    /**
     * First Name
     */
    name: string;
    /**
     * Last Name
     */
    surname: string;
    /**
     * First Name + " " + Last Name
     */
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
     * Array [ExtendedProcessRole]{@link ProcessRole}
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


