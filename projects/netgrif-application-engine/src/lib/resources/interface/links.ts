/**
 * Object from Backend
 */
export interface Links {
    self: Url;
    identifier: Url;
    roles: Url;
    transaction: Url;
    file: Url;
}

/**
 * Object from Backend
 */
export interface Url {
    href: string;
}
