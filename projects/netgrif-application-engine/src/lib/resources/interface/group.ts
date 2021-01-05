
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
    id: number;
    members: Array<any>;
    childGroups: Array<any>;
}
