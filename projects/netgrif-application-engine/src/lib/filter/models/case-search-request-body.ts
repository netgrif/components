/**
 * Describes objects that are used to search/filter cases from the backend. Returned cases must fulfill all provided criteria.
 *
 * This object is used as part of a {@link Filter} object for [searchCases()]{@link CaseResourceService#searchCases}
 * method in {@link CaseResourceService}.
 *
 * Not to be confused with {@link CaseGetRequestBody}.
 */
export interface CaseSearchRequestBody {
    /**
     * Returned cases are instances of the specified PetriNet.
     * If more than one PetriNet is specified, the returned cases are instances of one of them.
     */
    process?: PetriNetSearchRequest | Array<PetriNetSearchRequest>;
    // TODO BUG 17.4.2020 - Needs investigation, backend has these attributes declared in CaseSearchRequest class but
    //  ElasticCaseService doesn't appear to use them
    // processIdentifier?: string | Array<string>;
    // title?: string | Array<string>;
    /**
     * Returned cases were created by the specified author.
     * If more than one author is specified, the returned cases were created by one of them.
     */
    author?: AuthorSearchRequest | Array<AuthorSearchRequest>;
    /**
     * Maps field IDs to field values. Returned cases must have data fields with the provided IDs that have the provided values.
     * If more than one field-value pair is specified, the data set of the returned cases must match all of the pairs.
     */
    data?: {
        [key: string]: string
    };
    /**
     * A full text query on all indexed fields, that are available for full text searching.
     *
     * Full text search is enabled on case's title, author's name and author's email by default.
     */
    fullText?: string;
    /**
     * Returned cases, that have tasks, that correspond to specified transition ID.
     * If more than one transition ID is specified, the returned cases must have tasks that correspond to at least one of them.
     */
    transition?: string | Array<string>;
    /**
     * Returned cases must have an active role with the specified role ID.
     * If more than one role ID is specified, the returned cases must have at least one of them active.
     */
    role?: string | Array<string>;
    /**
     * An Elasticsearch Query string query.
     *
     * See Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information.
     */
    query?: string;
    /**
     * Returned cases must have the specified string ID.
     * If more than one string ID is specified, the returned cases must have one of them.
     */
    stringId?: string | Array<string>;
    /**
     * Returned cases must be instances of processes of the group with the specified ID.
     *
     * If more than one group ID is specified, the returned cases are instances of one of the groups.
     */
    group?: string | Array<string>;
}

/**
 * Queries cases that are instances of a specific PetriNet
 */
export interface PetriNetSearchRequest {
    /**
     * Queried PetriNet identifier
     */
    identifier: string;
}

/**
 * Queries cases that were created by a specific author. Case's author must match all provided attributes to fulfill the query.
 */
export interface AuthorSearchRequest {
    /**
     * Author's user ID
     */
    id?: string;
    /**
     * Author's user name
     */
    name?: string;
    /**
     * Author's user email
     */
    email?: string;
}
