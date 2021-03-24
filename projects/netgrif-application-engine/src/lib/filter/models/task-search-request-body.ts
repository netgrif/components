import {PetriNetSearchRequest} from './case-search-request-body';

/**
 * Describes objects that are used to search/filter tasks from backend. Returned tasks must fulfill all provided criteria.
 *
 * This object is used as part of a {@link Filter} object for [searchTask()]{@link TaskResourceService#searchTask}
 * method in {@link TaskResourceService}.
 */
export interface TaskSearchRequestBody {
    /**
     * Returned tasks must have the role with the specified role ID.
     *
     * If more than one role ID is specified, the returned tasks must have at least one of them.
     */
    role?: string | Array<string>;
    /**
     * Returned tasks must fulfill the query defined by the object. See {@link TaskSearchCaseQuery} for information about query generation.
     *
     * If more than one object is specified, the returned tasks must fulfill one of the queries.
     */
    case?: TaskSearchCaseQuery | Array<TaskSearchCaseQuery>;
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
    process?: PetriNetSearchRequest | Array<PetriNetSearchRequest>;
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
     *
     * Filters with this field set cannot be used with the [getTasks]{@link TaskResourceService#getTasks} method
     * of the {@link TaskResourceService}. Doing so will result in an error.
     */
    query?: string;
    /**
     * Returned tasks must have the specified transition ID.
     *
     * If more than one transition ID is specified, the returned tasks must have one of them.
     */
    transitionId?: string | Array<string>;
    /**
     * Returned tasks must be from cases that are instances of processes of the group with the specified ID.
     *
     * If more than one group ID is specified, the returned tasks are from cases of one of the groups.
     */
    group?: string | Array<string>;
}

/**
 * Defines the way tasks case is queried.
 *
 * [id]{@link TaskSearchCaseQuery#id} takes precedence over [title]{@link TaskSearchCaseQuery#title} in case both attributes are defined.
 */
export interface TaskSearchCaseQuery {
    /**
     * Returned tasks must be of case with the specified case ID.
     */
    id?: string;
    /**
     * Returned tasks must be of case that contains the specified string in its title.
     */
    title?: string;
}
