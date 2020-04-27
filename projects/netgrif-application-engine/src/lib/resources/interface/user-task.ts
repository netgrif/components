import {Authority} from './authority';
import {UserProcessRole} from './user-process-role';
import {Group, ProcessRole} from './user';

/**
 * User for Task
 */
export interface UserTask {
    /**
     * **Example:** example@netgrif.com
     */
    email: string;
    /**
     * **Example:** Example
     */
    name: string;
    /**
     * **Example:** Netgrif
     */
    surname: string;
    /**
     * **Example:** ACTIVE
     */
    state: string;
    /**
     * Array [Authority]{@link Authority}
     */
    authorities: Array<Authority>;
    /**
     * Array [UserProcessRole]{@link UserProcessRole}
     */
    userProcessRoles: Array<UserProcessRole>;
    /**
     * Array [ProcessRole]{@link ProcessRole}
     */
    processRoles: Array<ProcessRole>;
    /**
     * Array [Group]{@link Group}
     */
    groups: Array<Group>;
    /**
     * First name + " " + Surname
     *
     * **Example:** Example Netgrif
     */
    fullName: string;
    /**
     * Registered User
     */
    registered: boolean;
}
