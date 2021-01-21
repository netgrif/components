import {Predicate} from './predicate';
import {Category} from '../category/category';
import {Query} from '../query/query';

/**
 * A predicate wrapper, that can contain a generator of a Predicate.
 *
 * This class is used to transfer search predicates added by other means into the search GUI.
 */
export class PredicateWithGenerator extends Predicate {

    /**
     * @param _predicate the wrapped predicate
     * @param _generator the `Category` instance that generates this predicate.
     * If a generator is provided, the predicate is marked as initially hidden.
     */
    constructor(protected _predicate: Predicate, protected _generator?: Category<any>) {
        super();
        this._visible = !_generator;
    }

    get query(): Query {
        return this._predicate.query;
    }

    /**
     * @returns the Category that generates the predicate, or `undefined` if none was provided during the creation of this instance.
     */
    get generator(): Category<any> {
        return this._generator;
    }
}
