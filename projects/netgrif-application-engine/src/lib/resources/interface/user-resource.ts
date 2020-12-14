import {UserResourceSmall} from './user-resource-small';
import {Group} from './group';
import {Authority} from './authority';
import {ProcessRole} from './process-role';

/**
 * The user object as sent by backend. The frontend transforms this object with the help of {@link UserTransformer}
 * and uses the transformed object to handle all frontend logic.
 */
export interface UserResource extends UserResourceSmall {
    telNumber?: string;
    groups: Array<Group>;
    authorities: Array<Authority>;
    nextGroups: Array<string>;
    processRoles: Array<ProcessRole>;
    _links?: any;
}
