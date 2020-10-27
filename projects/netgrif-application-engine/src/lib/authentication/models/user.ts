export interface Authority {
    authority: string;
}

export interface ProcessRole {
    stringId: string;
    name: string;
    description?: string;
}

export interface UserProcessRole {
    roleId: string;
    netId?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    fullName?: string;
    groups?: Array<any>;
    authorities?: Array<Authority>;
    processRoles?: Array<ProcessRole>;
    userProcessRoles?: Array<UserProcessRole>;
    nextGroups?: Array<string>;
    _links?: any;
}
