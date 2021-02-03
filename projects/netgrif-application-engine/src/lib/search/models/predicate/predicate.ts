import {Query} from '../query/query';

/**
 * Building block of search queries. Represents any node in a tree of predicates, that are combined with {@link BooleanOperator}s to create
 * a search query.
 *
 * See {@link SearchService} for more information.
 */
export abstract class Predicate {

    protected _visible: boolean;

    /**
     * @param initiallyVisible whether the predicate should be initially displayed or not
     */
    protected constructor(initiallyVisible = true) {
        this._visible = !!initiallyVisible;
    }

    /**
     * @returns whether the Predicate should be displayed, or not
     */
    public get isVisible(): boolean {
        return this._visible;
    }

    /**
     * @returns the {@link Query} object that corresponds to the `Query` for the entire subtree of Predicates, with
     * this Predicate as it's root node.
     */
    public abstract get query(): Query;

    /**
     * Sets the predicates state to `visible`
     */
    public show(): void {
        this._visible = true;
    }
}
