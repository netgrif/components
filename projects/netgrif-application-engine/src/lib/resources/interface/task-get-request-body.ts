/**
 * Describes request body for task search endpoint. Returned tasks must fulfill all provided criteria.
 *
 * This object is a raw request body for [getTasks()]{@link TaskResourceService#getTasks} method in {@link TaskResourceService}.
 *
 * Not to be confused with {@link TaskSearchRequestBody}.
 */
export interface TaskGetRequestBody {
    /**
     * Returned tasks must have the role with the specified role ID.
     * If more than one role ID is specified, the returned tasks must have at least one of them.
     */
    role?: string | Array<string>;
    /**
     * Returned task must be of case with the specified case ID.
     * If more than one case ID is specified, the returned task must be of one of them.
     *
     * Consult {@link CaseGetRequest} for the behavior of this parameter if an object is given.
     */
    case?: string | Array<string> | CaseGetRequest;
    /**
     * Returned tasks must have the specified title (default value, case insensitive).
     * If more than one title is specified, the returned tasks must have one of them.
     */
    title?: string | Array<string>;
    /**
     * Returned tasks must be assigned to the user with the specified user ID.
     * If more than one user ID is specified, the returned tasks must be assigned to one of the users.
     *
     * String can be either a string representation of a number, in which case it behaves same as the above case.
     * Or string can be user email. Array of emails cannot be used.
     */
    user?: string | number | Array<number>;
    /**
     * Returned tasks must have the specified transition ID.
     * If more than one transition ID is specified, the returned tasks must have one of them.
     */
    transition?: string | Array<string>;
    /**
     * Returned tasks must be of process with the specified process ID.
     * If more than one process ID is specified, the returned tasks must be of one of them.
     */
    process?: string | Array<string>;
    /**
     * A full text query on task's title and it's case's title (case insensitive).
     */
    fullText?: string;
}

/**
 * Can search tasks by id or title of their cases. Only one of the attributes can be used for searching.
 * If both are given, `title` takes precedence and `id` will be ignored.
 */
export interface CaseGetRequest {
    /**
     * Returned tasks must be of case with the specified title (case insensitive).
     * If more than one case title is specified, the retuned tasks
     */
    title?: string | Array<string>;
    /**
     * Returned tasks must be of case with the specified case ID.
     * If more than one case ID is specified, the returned tasks must be of one of them.
     */
    id?: string | Array<string>;
}
