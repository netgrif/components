import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {KeyValue} from '@angular/common';
import {BooleanOperator} from '../models/boolean-operator';
import {EditablePredicate} from '../models/predicate/editable-predicate';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';
import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';

/**
 * A universal search component that can be used to interactively create search predicates for anything with supported categories.
 *
 * This component is responsible for the interactive creation of an AND {@link ClausePredicate} object instance.
 * The nested Predicates are OR {@link ClausePredicate} instances created by {@link AbstractSearchClauseComponent}.
 *
 * Search categories must be provided by the {@link NAE_SEARCH_CATEGORIES} injection token.
 * Default factory methods for [task]{@link defaultTaskSearchCategoriesFactory} and
 * [case]{@link defaultCaseSearchCategoriesFactory} search categories exist. See their documentation for more information.
 */
export abstract class AbstractSearchComponent implements OnDestroy {

    public removeChild$: Subject<number>;

    public advancedSearchDisplayed = false;

    public fullTextFormControl: FormControl;

    protected constructor(protected _searchService: SearchService,
                          protected _logger: LoggerService) {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this._removeChildAt(id));
        this.fullTextFormControl = new FormControl();

        this.fullTextFormControl.valueChanges.pipe(
            debounceTime(600),
            filter(newValue => !!newValue)
        ).subscribe(fulltext => {
            this._searchService.setFullTextFilter(fulltext);
        });
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

    public hasPredicates(): boolean {
        return this.getPredicateMap().size > 0;
    }

    public addChildPredicate(): void {
        this._searchService.rootPredicate.addNewClausePredicate(BooleanOperator.OR);
    }

    public toggleSearchMode(): void {
        if (this.advancedSearchDisplayed) {
            this._searchService.clearPredicates();
        } else {
            this._searchService.clearFullTextFilter();
            if (!this._searchService.hasVisiblePredicates) {
                this.addChildPredicate();
            }
        }

        this.advancedSearchDisplayed = !this.advancedSearchDisplayed;
    }

    protected _removeChildAt(id: number): void {
        this._searchService.rootPredicate.removePredicate(id);
    }
}
