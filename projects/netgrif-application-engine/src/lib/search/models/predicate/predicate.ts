import {Query} from '../query/query';

/**
 * Building block of search queries.
 */
export abstract class Predicate {

    public abstract get query(): Query;
}
