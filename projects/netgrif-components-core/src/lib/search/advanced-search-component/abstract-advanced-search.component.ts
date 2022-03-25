import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';
import {SearchService} from '../search-service/search.service';
import {KeyValue} from '@angular/common';
import {EditablePredicate} from '../models/predicate/editable-predicate';
import {Subject} from 'rxjs';
import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {BooleanOperator} from '../models/boolean-operator';
import {
    AdvancedSearchComponentInitializationService
} from '../advanced-search-component-initialization-service/advanced-search-component-initialization.service';

@Component({
    selector: 'ncc-abstract-advanced-search',
    template: ''
})
export abstract class AbstractAdvancedSearchComponent implements AfterViewInit, OnDestroy {

    /**
     * Whether the contents displayed in this component can be edited by the user or not.
     *
     * Defaults to `true`
     */
    @Input() editable = true;

    public removeChild$: Subject<number>;

    protected constructor(protected _searchService: SearchService,
                          protected _initializationService: AdvancedSearchComponentInitializationService) {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this._removeChildAt(id));

        if (!this._searchService.hasVisiblePredicates) {
            this.addChildPredicate();
        }
    }

    ngAfterViewInit(): void {
        this._initializationService.completeInitialization();
    }

    ngOnDestroy(): void {
        this.removeChild$.complete();
    }

    public trackByPredicates = (a: number, b: KeyValue<number, EditablePredicate>) => b.value;

    public getPredicateMap(): Map<number, EditableClausePredicateWithGenerators> {
        const map = new Map<number, EditableClausePredicateWithGenerators>();

        for (const [key, value] of this._searchService.rootPredicate.getPredicateMap().entries()) {
            if (value.isVisible) {
                map.set(key, value.getWrappedPredicate() as EditableClausePredicateWithGenerators);
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
