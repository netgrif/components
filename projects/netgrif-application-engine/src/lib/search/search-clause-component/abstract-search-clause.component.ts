import {Input, OnInit} from '@angular/core';
import {EditableClausePredicate} from '../models/predicate/editable-clause-predicate';


/**
 * Is responsible for the interactive creation of an OR {@link ClausePredicate} object instance.
 * The nested Predicates are {@link ElementaryPredicate} instances created by {@link AbstractSearchPredicateComponent}.
 */
export abstract class AbstractSearchClauseComponent implements OnInit {

    @Input() predicate: EditableClausePredicate;

    protected constructor() {
    }

    ngOnInit(): void {
        this.addChildPredicate();
    }

    public removeChildAt(id: number): void {
        this.predicate.removePredicate(id);
    }

    protected addChildPredicate(): void {
        this.predicate.addPredicate();
    }
}
