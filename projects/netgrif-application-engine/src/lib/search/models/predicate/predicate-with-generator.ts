import {Predicate} from './predicate';
import {Category} from '../category/category';
import {Query} from '../query/query';
import {EditableElementaryPredicate} from './editable-elementary-predicate';

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
     * @param initiallyVisible overrides the initial visibility inferred from the presence/absence of the generator
     */
    constructor(protected _predicate: Predicate, protected _generator?: Category<any>, initiallyVisible?: boolean) {
        super();
        this._visible = initiallyVisible !== undefined ? initiallyVisible : !_generator;
    }

    get query(): Query {
        return this._predicate.query;
    }

    /**
     * Can only be called if the wrapped predicate allows setting of the query.
     * Throws an error otherwise.
     * @param query the new query
     */
    set query(query: Query) {
        if (this._predicate instanceof EditableElementaryPredicate) {
            this._predicate.query = query;
        } else {
            throw new Error('The wrapped predicate cannot have its query set');
        }
    }

    /**
     * @returns the Category that generates the predicate, or `undefined` if none was provided during the creation of this instance.
     */
    get generator(): Category<any> {
        return this._generator;
    }

    /**
     * @returns the wrapped Predicate
     */
    get wrappedPredicate(): Predicate {
        return this._predicate;
    }

    show() {
        super.show();
        this._predicate.show();
    }
}
