/**
 * Describes objects that are used to search/filter tasks from backend. Returned tasks must fulfill all provided criteria.
 *
 * This object is used as part of a {@link Filter} object for [searchTask()]{@link TaskResourceService#searchTask}
 * method in {@link TaskResourceService}.
 *
 * Not to be confused with {@link TaskGetRequestBody}.
 */
export interface TaskSearchRequestBody {
    /**
     * Returned tasks must have the role with the specified role ID.
     *
     * If more than one role ID is specified, the returned tasks must have at least one of them.
     */
    role?: string | Array<string>;
    /**
     * Returned tasks must be of case with the specified case ID.
     *
     * If more than one case ID is specified, the returned tasks must be of one of them.
     */
    case?: string | Array<string>;
    /**
     * Returned tasks must have the specified title (default value).
     *
     * If more than one title is specified, the returned tasks must have one of them.
     */
    title?: string | Array<string>;
    /**
     * Returned tasks must be assigned to the user with the specified user ID.
     *
     * If more than one user ID is specified, the returned tasks must be assigned to one of the users.
     */
    user?: number | Array<number>;
    /**
     * Returned tasks must be of process with the specified process ID.
     *
     * If more than one process ID is specified, the returned tasks must be of one of them.
     */
    process?: string | Array<string>;
    /**
     * A full text query on all index fields, that available for full text searching.
     *
     * Full text search is enabled on task's title and it's case's title by default.
     */
    fullText?: string;
    /**
     * An Elasticsearch Query string query.
     *
     * See Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information.
     */
    query?: string;
    /**
     * Returned tasks must have the specified transition ID.
     *
     * If more than one transition ID is specified, the returned tasks must have one of them.
     */
    transitionId?: string | Array<string>;
}
