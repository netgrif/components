/**
 * @ignore
 * Object from Backend
 */
export interface Links {
    /**
     * @ignore
     */
    self: Url;
    /**
     * @ignore
     */
    identifier: Url;
    /**
     * @ignore
     */
    roles: Url;
    /**
     * @ignore
     */
    transaction: Url;
    /**
     * @ignore
     */
    file: Url;
}

/**
 * @ignore
 * Object from Backend
 */
export interface Url {
    /**
     * @ignore
     */
    href: string;
}
