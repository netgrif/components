import {Input} from '@angular/core';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {Subject} from 'rxjs';


/**
 * Is responsible for the interactive creation of a single {@link ElementaryPredicate} object instance.
 */
export abstract class AbstractSearchPredicateComponent {

    @Input() predicate: EditableElementaryPredicate;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;

    protected constructor() {
    }

    public remove(): void {
        this.remove$.next(this.predicateId);
    }
}
