import NetRole from './netRole';
import {Permissions} from './permissions';

export default interface RolesAndPermissions {
    processRoles: Array<NetRole>;
    permissions: Permissions;
}
