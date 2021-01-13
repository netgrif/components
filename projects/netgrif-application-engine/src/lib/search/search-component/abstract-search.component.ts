import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {EditableClausePredicate} from '../models/predicate/editable-clause-predicate';
import {Subject} from 'rxjs';
import {OnDestroy, OnInit} from '@angular/core';
import {KeyValue} from '@angular/common';
import {BooleanOperator} from '../models/boolean-operator';
import {EditablePredicate} from '../models/predicate/editable-predicate';

/**
 * A universal search component that can be used to interactively create search predicates for anything with supported categories.
 *
 * This component is responsible for the interactive creation of an AND {@link ClausePredicate} object instance.
 * The nested Predicates are OR {@link ClausePredicate} instances created by {@link AbstractSearchClauseComponent}.
 *
 * Search categories must be provided by the {@link NAE_SEARCH_CATEGORIES} injection token.
 * Default factory methods for [task]{@link defaultTaskSearchCategoriesFactoryMethod} and
 * [case]{@link defaultCaseSearchCategoriesFactoryMethod} search categories exist. See their documentation for more information.
 */
export abstract class AbstractSearchComponent implements OnInit, OnDestroy {

    protected _rootPredicate: EditableClausePredicate;
    public removeChild$: Subject<number>;

    protected constructor(protected _translate: TranslateService,
                          protected _searchService: SearchService,
                          protected _logger: LoggerService) {
        this.removeChild$ = new Subject<number>();
        this.removeChild$.subscribe(id => this._removeChildAt(id));
        this._rootPredicate = new EditableClausePredicate(BooleanOperator.AND);
    }

    ngOnInit(): void {
        this.addChildPredicate();
    }

    ngOnDestroy(): void {
        this.removeChild$.complete();
    }

    public trackByPredicates = (a: number, b: KeyValue<number, EditablePredicate>) => b.value;

    public getPredicateMap(): Map<number, EditablePredicate> {
        return this._rootPredicate.getPredicateMap();
    }

    public addChildPredicate(): void {
        this._rootPredicate.addClausePredicate(BooleanOperator.OR);
    }

    protected _removeChildAt(id: number): void {
        this._rootPredicate.removePredicate(id);
    }
}
