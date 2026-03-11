import {ProcessRole} from "./process-role";
import {Authority} from "./authority";

export interface GroupsInterface {
    groups: [];
}

/**
 * Object from Backend
 */
export interface GroupInterface {
    id: number;
    name: string;
}

/**
 * Object from Backend
 */
export interface Group {
    id: string;
    displayName: string;
    realmId: string;
    identifier: string;
    ownerId: string;
    ownerUsername: string;
    processRoles?: ProcessRole[];
    authoritySet?: Authority[];
    groupIds?: string[];
    subGroupIds?: string[];
    memberIds?: string[];
}
