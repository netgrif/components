import {UserResourceSmall} from '../../resources/interface/user-resource-small';
import {ProcessRole} from '../../resources/interface/process-role';
import {Group} from '../../resources/interface/group';

/**
 * The user object that is used by the frontend in its logic.
 */
export interface User extends UserResourceSmall {
    telNumber?: string;
    groups: Array<Group>;
    authorities: Array<string>;
    nextGroups: Array<string>;
    processRoles: Array<ProcessRole>;
}
