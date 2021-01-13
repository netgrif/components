import {Input, OnDestroy, OnInit} from '@angular/core';
import {EditableClausePredicate} from '../models/predicate/editable-clause-predicate';
import {Subject} from 'rxjs';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {KeyValue} from '@angular/common';


/**
 * Is responsible for the interactive creation of an OR {@link ClausePredicate} object instance.
 * The nested Predicates are {@link ElementaryPredicate} instances created by {@link AbstractSearchPredicateComponent}.
 */
export abstract class AbstractSearchClauseComponent implements OnInit, OnDestroy {

    @Input() predicate: EditableClausePredicate;
    public removeChild$: Subject<number>;

    protected constructor() {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this.removeChildAt(id));
    }

    ngOnInit(): void {
        this.addChildPredicate();
    }

    ngOnDestroy(): void {
        this.removeChild$.complete();
    }

    public trackByPredicates = (a: number, b: KeyValue<number, EditableElementaryPredicate>) => b.value;

    public getPredicateMap(): Map<number, EditableElementaryPredicate> {
        return this.predicate.getPredicateMap();
    }

    public removeChildAt(id: number): void {
        this.predicate.removePredicate(id);
    }

    public addChildPredicate(): void {
        this.predicate.addPredicate();
    }
}
