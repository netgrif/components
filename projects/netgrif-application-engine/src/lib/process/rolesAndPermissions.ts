import NetRole from './netRole';

export default interface RolesAndPermissions {
    processRoles: Array<NetRole>;
    permissions: object;
}
