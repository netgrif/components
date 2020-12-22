import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {Input, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {EditableClausePredicate} from '../models/predicate/editable-clause-predicate';


/**
 * Is responsible for the interactive creation of an OR {@link ClausePredicate} object instance.
 * The nested Predicates are {@link ElementaryPredicate} instances created by {@link AbstractSearchPredicateComponent}.
 */
export abstract class AbstractSearchClauseComponent implements OnDestroy {

    @Input() predicate: EditableClausePredicate;

    protected _childPredicates: Map<number, EditableElementaryPredicate>;
    protected _childUpdated$: Subject<void>;
    protected _childCounter: IncrementingCounter;

    protected constructor() {
        this._childPredicates = new Map<number, EditableElementaryPredicate>();
        this._childUpdated$ = new Subject<void>();
        this._childCounter = new IncrementingCounter();
        this.addChildPredicate();
    }

    ngOnDestroy(): void {
        this._childUpdated$.complete();
    }

    public removeChildAt(id: number): void {
        this._childPredicates.delete(id);
    }

    protected addChildPredicate(): void {
        this._childPredicates.set(this._childCounter.next(), new EditableElementaryPredicate(this._childUpdated$));
    }
}
