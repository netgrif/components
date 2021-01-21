import {Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {KeyValue} from '@angular/common';
import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';
import {PredicateWithGenerator} from '../models/predicate/predicate-with-generator';


/**
 * Is responsible for the interactive creation of an OR {@link ClausePredicate} object instance.
 * The nested Predicates are {@link ElementaryPredicate} instances created by {@link AbstractSearchPredicateComponent}.
 */
export abstract class AbstractSearchClauseComponent implements OnInit, OnDestroy {

    @Input() predicate: EditableClausePredicateWithGenerators;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;
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

    public trackByPredicates = (a: number, b: KeyValue<number, PredicateWithGenerator>) => b.value;

    public getPredicateMap(): Map<number, PredicateWithGenerator> {
        return this.predicate.getPredicateMap();
    }

    public removeChildAt(id: number): void {
        this.predicate.removePredicate(id);
        if (this.predicate.getPredicateMap().size === 0) {
            this.remove$.next(this.predicateId);
        }
    }

    public addChildPredicate(): void {
        this.predicate.addNewElementaryPredicate();
    }
}
