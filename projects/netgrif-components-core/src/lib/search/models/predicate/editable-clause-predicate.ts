import {BooleanOperator} from '../boolean-operator';
import {Subject} from 'rxjs';
import {EditableElementaryPredicate} from './editable-elementary-predicate';
import {IncrementingCounter} from '../../../utility/incrementing-counter';
import {OnDestroy} from '@angular/core';
import {Query} from '../query/query';
import {EditablePredicate} from './editable-predicate';
import {Predicate} from './predicate';


/**
 * A complex, editable `Predicate`. Represents an inner node in the predicate tree, that can process changes of `Query` objects
 * held by its child nodes. It can notify the parent tree node about changes to the held `Query`.
 */
export class EditableClausePredicate extends EditablePredicate {

    protected _predicates: Map<number, Predicate>;
    protected _childUpdated$: Subject<void>;
    protected _childCounter: IncrementingCounter;
    protected _query: Query;

    constructor(protected _operator: BooleanOperator,
                parentNotifier?: Subject<void>,
                initiallyVisible = true,
                protected _bracketSubPredicateText = false) {
        super(parentNotifier, initiallyVisible);
        this._predicates = new Map<number, Predicate>();
        this._childUpdated$ = new Subject<void>();
        this._childCounter = new IncrementingCounter();
        this._query = Query.emptyQuery();
        this.initializeFilterTextSegmentsGenerator();

        this._childUpdated$.subscribe(() => {
            this.updateQueryAndNotify();
        });
    }

    get query(): Query {
        return this._query;
    }

    show() {
        super.show();
        this.showAll();
    }

    /**
     * Shows the predicates with the given ids. Skips ids that don't exist.
     * @param predicateIds the ids of the predicates that should be shown.
     */
    public showPredicates(predicateIds: Array<number>): void {
        predicateIds.forEach(id => {
            if (this._predicates.has(id)) {
                this._predicates.get(id).show();
            }
        });
    }

    /**
     * Adds new child predicate of type {@link EditableElementaryPredicate}
     * @param initiallyVisible whether the new predicate should be initially visible
     */
    addNewElementaryPredicate(initiallyVisible = true): number {
        return this.addPredicate(new EditableElementaryPredicate(this._childUpdated$, initiallyVisible));
    }

    /**
     * Adds new child predicate of type {@link EditableClausePredicate}
     * @param operator the operator of the child clause predicate
     * @param initiallyVisible whether the new predicate should be initially visible
     */
    addNewClausePredicate(operator: BooleanOperator, initiallyVisible = true): number {
        return this.addPredicate(new EditableClausePredicate(operator, this._childUpdated$, initiallyVisible));
    }

    /**
     * Generates an id for the new predicate, adds it into the map and updates the query
     *
     * If you want to add an editable predicate, use one of the other methods, so that this predicate can react to changes.
     * @param predicate the new predicate
     */
    public addPredicate(predicate: Predicate): number {
        const id = this._childCounter.next();
        this._predicates.set(id, predicate);
        this.updateQueryAndNotify();
        return id;
    }

    removePredicate(id: number): boolean {
        const r = this._predicates.delete(id);
        this.updateQueryAndNotify();
        return r;
    }

    public getPredicateMap(): Map<number, Predicate> {
        return this._predicates;
    }

    /**
     * Updates the `Query` and notifies the parent.
     */
    protected updateQueryAndNotify(): void {
        this.updateQuery();
        this.notifyParentPredicate();
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
        return Array.from(this._predicates.values()).map(p => p.query);
    }

    /**
     * Sets this predicate and all its sub-predicates to visible.
     */
    protected showAll(): void {
        for (const p of this._predicates.values()) {
            p.show();
        }
    }

    private initializeFilterTextSegmentsGenerator() {
        this._filterTextSegmentsGenerator = () => {
            return Predicate.combineTextSegmentsWithBooleanOperator(this._predicates.values(),
                this._operator, this._bracketSubPredicateText);
        };
    }
}
