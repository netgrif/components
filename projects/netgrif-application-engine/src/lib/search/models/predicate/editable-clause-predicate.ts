import {BooleanOperator} from '../boolean-operator';
import {Subject} from 'rxjs';
import {EditableElementaryPredicate} from './editable-elementary-predicate';
import {IncrementingCounter} from '../../../utility/incrementing-counter';
import {OnDestroy} from '@angular/core';
import {Query} from '../query/query';
import {EditablePredicate} from './editable-predicate';


/**
 * A complex, editable `Predicate`. Represents an inner node in the predicate tree, that can process changes of `Query` objects
 * held by its child nodes. It can notify the parent tree node about changes to the held `Query`.
 */
export class EditableClausePredicate extends EditablePredicate implements OnDestroy {

    protected _predicates: Map<number, EditablePredicate>;
    protected _childUpdated$: Subject<void>;
    protected _childCounter: IncrementingCounter;
    protected _query: Query;

    constructor(protected _operator: BooleanOperator, parentNotifier?: Subject<void>) {
        super(parentNotifier);
        this._predicates = new Map<number, EditablePredicate>();
        this._childUpdated$ = new Subject<void>();
        this._childCounter = new IncrementingCounter();
        this._query = Query.emptyQuery();

        this._childUpdated$.subscribe(() => {
            this.updateQueryAndNotify();
        });
    }

    ngOnDestroy(): void {
        this._childUpdated$.complete();
    }

    get query(): Query {
        return this._query;
    }

    /**
     * Adds new child predicate of type {@link EditableElementaryPredicate}
     */
    addElementaryPredicate(): number {
        return this.addPredicate(new EditableElementaryPredicate(this._childUpdated$));
    }

    /**
     * Adds new child predicate of type {@link EditableClausePredicate}
     * @param operator the operator of the child clause predicate
     */
    addClausePredicate(operator: BooleanOperator): number {
        return this.addPredicate(new EditableClausePredicate(operator, this._childUpdated$));
    }

    removePredicate(id: number): boolean {
        const r = this._predicates.delete(id);
        this.updateQueryAndNotify();
        return r;
    }

    public getPredicateMap(): Map<number, EditablePredicate> {
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
     * Generates an id for the new predicate, adds it into the map and updates the query
     * @param predicate the new predicate
     */
    protected addPredicate(predicate: EditablePredicate): number {
        const id = this._childCounter.next();
        this._predicates.set(id, predicate);
        this.updateQueryAndNotify();
        return id;
    }
}
