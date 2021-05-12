import {Predicate} from './predicate';
import {Query} from '../query/query';
import {BooleanOperator} from '../boolean-operator';

/**
 * Represents a clause of {@link Predicate}s combined with a {@link BooleanOperator}.
 */
export class ClausePredicate extends Predicate {

    /**
     * Stores the {@link Predicate}s that this Predicate combines.
     */
    protected _predicates: Array<Predicate>;
    /**
     * Stores the resulting query of this Predicate.
     */
    protected _query: Query;

    /**
     * @param predicates Predicates that should be combined into one
     * @param _operator Operator that is used to combine the predicates
     * @param initiallyVisible whether the predicate should be initially displayed or not
     * @param _bracketSubPredicateText whether the individual sub predicates are wrapped in brackets when a textual representation
     * is generated
     */
    constructor(predicates: Array<Predicate>,
                protected _operator: BooleanOperator,
                initiallyVisible = true,
                protected _bracketSubPredicateText = false) {
        super(initiallyVisible);
        this._predicates = [];
        this._predicates.push(...predicates);
        this.updateQuery();
        this.initializeFilterTextSegmentsGenerator();
    }

    get query(): Query {
        return this._query;
    }

    /**
     * Adds another {@link Predicate} to the clause and updates this {@link Predicate}'s {@link Query}.
     * @param newPredicate - the Predicate that should be added to the clause
     * @returns the index of the added Predicate, that can be used to remove it.
     * Note that removing predicates with a lower index shifts the order of indices.
     */
    public addPredicate(newPredicate: Predicate): number {
        this._predicates.push(newPredicate);
        this.updateQuery();
        return this._predicates.length - 1;
    }

    /**
     * Removes the {@link Predicate} at the given `index` from this clause and updates this {@link Predicate}'s {@link Query}.
     * If the `index` is invalid does nothing.
     * @param index index of the {@link Predicate} in this clause that should be removed
     * @returns whether a predicate was removed, or not
     */
    public removePredicate(index: number): boolean {
        if (index >= 0 && index < this._predicates.length) {
            this._predicates.splice(index, 1);
            this.updateQuery();
            return true;
        }
        return false;
    }

    /**
     * Sets this predicate and all its sub-predicates to visible.
     */
    public showAll(): void {
        this.show();
        this._predicates.forEach(p => p.show());
    }

    /**
     * Updates the value of the [_query]{@link ClausePredicate#_query} attribute.
     *
     * See [combineQueries()]{@link Query#combineQueries} for more information.
     */
    protected updateQuery(): void {
        this._query = Query.combineQueries(this.queries, this._operator);
    }

    /**
     * @returns the `Array` of {@link Query} objects stored within this object's [_predicates]{@link ClausePredicate#_predicates} attribute.
     */
    protected get queries(): Array<Query> {
        return this._predicates.map(p => p.query);
    }

    private initializeFilterTextSegmentsGenerator() {
        this._filterTextSegmentsGenerator = () => {
            return Predicate.combineTextSegmentsWithBooleanOperator(this._predicates, this._operator, this._bracketSubPredicateText);
        };
    }
}
