import {Query} from '../query/query';

/**
 * Building block of search queries. Represents any node in a tree of predicates, that are combined with {@link BooleanOperator}s to create
 * a search query.
 *
 * See {@link SearchService} for more information.
 */
export abstract class Predicate {

    /**
     * @returns the {@link Query} object that corresponds to the `Query` for the entire subtree of Predicates, with
     * this Predicate as it's root node.
     */
    public abstract get query(): Query;
}
