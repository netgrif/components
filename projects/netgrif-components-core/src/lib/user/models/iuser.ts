/**
 * A generic representation of a User object. All User and User-like instances implement this interface that holds the most
 * basic User attributes.
 */
export interface IUser {
    id: string;
    /**
     * **Example:** johndoe
     */
    username: string;
    /**
     * **Example:** example@netgrif.com
     */
    email: string;
    /**
     * **Example:** 68187906482dcc38f6641bff
     */
    realmId: string;
    /**
     * **Example:** Example
     * @deprecated
     */
    name: string;
    /**
     * **Example:** Example
     */
    firstName: string;
    /**
     * **Example:** Netgrif
     @deprecated
     */
    surname: string;
    /**
     * **Example:** Netgrif
     */
    lastName: string;
    /**
     * **Example:** default
     */
    workspaceId: string;
}
