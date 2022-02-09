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

    /**
     * Whether the contents displayed in this component can be edited by the user or not.
     *
     * Defaults to `true`
     */
    @Input() editable = true;
    @Input() predicate: EditableClausePredicateWithGenerators;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;
    public removeChild$: Subject<number>;

    protected constructor() {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this.removeChildAt(id));
    }

    ngOnInit(): void {
        if (this.getPredicateMap().size === 0) {
            this.addChildPredicate();
        }
    }

    ngOnDestroy(): void {
        this.removeChild$.complete();
    }

    public trackByPredicates = (a: number, b: KeyValue<number, PredicateWithGenerator>) => b.value;

    public getPredicateMap(): Map<number, PredicateWithGenerator> {
        const map = new Map<number, PredicateWithGenerator>();

        for (const [key, value] of this.predicate.getPredicateMap().entries()) {
            if (value.isVisible) {
                map.set(key, value);
            }
        }

        return map;
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
