import {Predicate} from './predicate';
import {Category} from '../category/category';
import {Query} from '../query/query';

/**
 * A predicate wrapper, that can contain a generator of a Predicate.
 *
 * This class is used to transfer search predicates added by other means into the search GUI.
 */
export class PredicateWithGenerator extends Predicate {

    protected _visible: boolean;

    /**
     * @param _predicate the wrapped predicate
     * @param _generator the `Category` instance that generates this predicate
     */
    constructor(protected _predicate: Predicate, protected _generator?: Category<any>) {
        super();
        this._visible = !_generator;
    }

    get query(): Query {
        return this._predicate.query;
    }

    /**
     * Whether this predicate should be displayed in the search GUI.
     *
     * If no generator is provided, then the predicate is visible.
     * If a generator is provided, then the predicate is hidden and can be made visible later.
     */
    get isVisible(): boolean {
        return this._visible;
    }

    /**
     * @returns the Category that generates the predicate, or `undefined` if none was provided during the creation of this instance.
     */
    get generator(): Category<any> {
        return this._generator;
    }

    /**
     * Makes the predicate visible
     */
    public show(): void {
        this._visible = true;
    }
}
