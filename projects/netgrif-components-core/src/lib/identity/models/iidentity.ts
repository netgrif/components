/**
 * todo doc
 * A generic representation of a User object. All User and User-like instances implement this interface that holds the most
 * basic User attributes.
 */
export interface IIdentity {
    id: string;
    /**
     * **Example:** example@netgrif.com
     */
    username: string;
    /**
     * **Example:** Example
     */
    firstname: string;
    /**
     * **Example:** Netgrif
     */
    lastname: string;
    /**
     * todo doc
     * */
    activeActorId: string;
}
