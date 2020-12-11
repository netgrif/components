import {UserSmall} from './user-small';
import {ProcessRole} from './process-role';
import {Authority} from '../../resources/interface/authority';
import {Group} from '../../resources/interface/group';

export interface User extends UserSmall {
    telNumber?: string;
    groups: Array<Group>;
    authorities: Array<Authority>;
    nextGroups: Array<string>;
    processRoles: Array<ProcessRole>;
}
