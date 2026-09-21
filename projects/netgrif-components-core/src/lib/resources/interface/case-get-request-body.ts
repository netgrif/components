import {PetriNetSearchRequest} from '../../filter/models/case-search-request-body';

/**
 * Describes request body for case search endpoint. Returned cases must fulfill all provided criteria.
 *
 * This object is a raw request body for [getCases()]{@link CaseResourceService#getCases} method in {@link CaseResourceService}.
 *
 * Not to be confused with {@link CaseSearchRequestBody}.
 */
export interface CaseGetRequestBody {
    /**
     * Returned cases are instances of the specified PetriNet.
     * If more than one PetriNet is specified, the returned cases are instances of one of them.
     */
    petriNet?: PetriNetSearchRequest | Array<PetriNetSearchRequest>;
    /**
     * Returned cases were created by the specified author.
     * If more than one author is specified, the returned cases were created by one of them.
     */
    author?: AuthorGetRequest | Array<AuthorGetRequest>;
    /**
     * Returned cases, that have tasks, that correspond to specified transition ID.
     * If more than one transition ID is specified, the returned cases must have tasks that correspond to at least one of them.
     */
    transition?: string | Array<string>;
    /**
     * A full text query on all fields, that are available for full text searching.
     *
     * Full text search is enabled on case's visual id, case's title, case's creation date,
     * case's dataset, author's name and author's email.
     */
    fulltext?: string;
    /**
     * Returned cases must have an active role with the specified role ID.
     * If more than one role ID is specified, the returned cases must have at least one of them active.
     */
    role?: Array<string>;
    /**
     * Maps field IDs to field values. Returned cases must have data fields with the provided IDs that have the provided values.
     * If more than one field-value pair is specified, the data set of the returned cases must match all of the pairs.
     */
    data?: {
        [key: string]: object
    };
    /**
     * Returned cases must have the specified string ID.
     * If more than one string ID is specified, the returned cases must have one of them.
     */
    stringId?: string | Array<string>;

    tags?: {
        [key: string]: string
    };
}

/**
 * Queries cases that were created by a specified author.
 *
 * Query is generated only for one of the attributes.
 *
 * The priority of the attributes in query generation is as follows: `email` > `name` > `id`
 */
export interface AuthorGetRequest {
    /**
     * Author's user email.
     *
     * Has the highest priority for query generation.
     * If it's present in the request, query will only be generated for this attribute.
     */
    email?: string;
    /**
     * Author's user name.
     *
     * Has the second highest priority for query generation.
     * If it's present in the request, a query will only be generated for this attribute, if `email` is not present.
     */
    name?: string;
    /**
     * Author's user ID.
     *
     * Has the lowest priority for query generation.
     * A query will only be generated if it is the only attribute present.
     */
    id?: number;
}
