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
     */
    name: string;
    /**
     * **Example:** Netgrif
     */
    surname: string;
}
