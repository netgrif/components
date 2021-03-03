import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';
import {SearchService} from '../search-service/search.service';
import {KeyValue} from '@angular/common';
import {EditablePredicate} from '../models/predicate/editable-predicate';
import {Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {BooleanOperator} from '../models/boolean-operator';

export class AbstractAdvancedSearchComponent implements OnDestroy {

    public removeChild$: Subject<number>;

    protected constructor(protected _searchService: SearchService) {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this._removeChildAt(id));
    }

    ngOnDestroy(): void {
        this.removeChild$.complete();
    }

    public trackByPredicates = (a: number, b: KeyValue<number, EditablePredicate>) => b.value;

    public getPredicateMap(): Map<number, EditableClausePredicateWithGenerators> {
        const map = new Map<number, EditableClausePredicateWithGenerators>();

        for (const [key, value] of this._searchService.rootPredicate.getPredicateMap().entries()) {
            if (value.isVisible) {
                map.set(key, value.wrappedPredicate as EditableClausePredicateWithGenerators);
            }
        }

        return map;
    }

    public addChildPredicate(): void {
        this._searchService.rootPredicate.addNewClausePredicate(BooleanOperator.OR);
    }

    protected _removeChildAt(id: number): void {
        this._searchService.rootPredicate.removePredicate(id);
        if (this.getPredicateMap().size === 0) {
            this.addChildPredicate();
        }
    }
}
