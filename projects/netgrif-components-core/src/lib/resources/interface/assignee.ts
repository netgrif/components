/**
 * Object from Backend
 */
export interface Assignee {

    /**
     * **Example:** 68187906482dcc38f6641bff
     */
    id: string;

    /**
     * **Example:** Admin
     */
    realmId: string;

    /**
     * Username of user
     *
     * **Example:** admin
     */
    username: string;

    /**
     * First name + " " + Surname
     *
     * **Example:** Example Netgrif
     */
    fullName: string;
}
