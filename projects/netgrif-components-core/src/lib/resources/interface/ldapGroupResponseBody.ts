import {ProcessRole} from './process-role';

export interface LdapGroupResponseBody {
    ldapGroupResponseBodies: Array<LdapGroup>;
}

export interface LdapGroup {
    dn: string;
    cn?: string;
    description?: string;
    processRoles?: Array<ProcessRole>;
}
