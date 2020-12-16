import {Predicate} from './predicate';
import {Query} from '../query/query';

/**
 * The simples type of `Predicate`. Represents a leaf node in the predicate tree.
 */
export class ElementaryPredicate extends Predicate {

    constructor(protected _query: Query) {
        super();
    }

    get query(): Query {
        return this._query;
    }

}
