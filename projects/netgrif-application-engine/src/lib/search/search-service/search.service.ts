import {Injectable, OnDestroy} from '@angular/core';
import {BooleanOperator} from '../models/boolean-operator';
import {Filter} from '../../filter/models/filter';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Predicate} from '../models/predicate/predicate';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {MergeOperator} from '../../filter/models/merge-operator';
import {PredicateRemovalEvent} from '../models/predicate-removal-event';
import {Query} from '../models/query/query';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';
import {Category} from '../models/category/category';

/**
 * Holds information about the filter that is currently applied to the view component, that provides this services.
 */
@Injectable()
export class SearchService implements OnDestroy {

    /**
     * {@link Filter} that is applied to the view, even if the user doesn't search anything.
     */
    protected _baseFilter: Filter;
    /**
     * Holds the {@link Predicate} tree root for user search queries.
     */
    protected _rootPredicate: EditableClausePredicateWithGenerators;
    /**
     * Holds the {@link Filter} that is currently being applied to the view.
     */
    protected _activeFilter: BehaviorSubject<Filter>;
    /**
     * Holds the full text {@link Filter} if set, `undefined` otherwise.
     */
    protected _fullTextFilter: SimpleFilter | undefined;
    /**
     * The index of a removed {@link Predicate} is emmited into this stream
     */
    protected _predicateRemoved$: Subject<PredicateRemovalEvent>;
    /**
     * The `rootPredicate` uses this stream to notify the search service about changes to the held query
     */
    private readonly _predicateQueryChanged$: Subject<void>;

    /**
     * The {@link Predicate} tree root uses an [AND]{@link BooleanOperator#AND} operator to combine the Predicates.
     * @param baseFilter Filter that should be applied to the view when no searching is being performed.
     */
    constructor(baseFilter: Filter) {
        this._baseFilter = baseFilter.clone();
        this._predicateQueryChanged$ = new Subject<void>();
        this._rootPredicate = new EditableClausePredicateWithGenerators(BooleanOperator.AND, this._predicateQueryChanged$);
        this._activeFilter = new BehaviorSubject<Filter>(this._baseFilter);
        this._predicateRemoved$ = new Subject<PredicateRemovalEvent>();

        this.predicateQueryChanged$.subscribe(() => {
            this.updateActiveFilter();
        });
    }

    ngOnDestroy(): void {
        this._predicateRemoved$.complete();
        this._activeFilter.complete();
        this._predicateQueryChanged$.complete();
    }

    /**
     * @returns the Filter that is currently applied to the view
     */
    public get activeFilter(): Filter {
        return this._activeFilter.getValue();
    }

    /**
     * @returns an `Observable` that updates every time the active Filter changes.
     */
    public get activeFilter$(): Observable<Filter> {
        return this._activeFilter.asObservable();
    }

    /**
     * @returns `true` if a filter other than the base filter is currently applied.
     * Returns `false` if only the base filter is currently applied.
     */
    public get additionalFiltersApplied(): boolean {
        return !this._rootPredicate.query.isEmpty || !!this._fullTextFilter;
    }

    /**
     * @returns a copy of the base filter
     */
    public get baseFilter(): Filter {
        return this._baseFilter.clone();
    }

    /**
     * @returns an Observable that emits the index of the removed predicate whenever a predicate is removed
     */
    public get predicateRemoved$(): Observable<PredicateRemovalEvent> {
        return this._predicateRemoved$.asObservable();
    }

    /**
     * @returns the root predicate of the search service, that can be used to generate search requests with custom queries
     */
    public get rootPredicate(): EditableClausePredicateWithGenerators {
        return this._rootPredicate;
    }

    /**
     * @returns an Observable that emits whenever the root predicates query changes
     */
    protected get predicateQueryChanged$(): Observable<Query> {
        return this._predicateQueryChanged$.asObservable().pipe(
            map( () => this._rootPredicate.query),
            distinctUntilChanged((prev, curr) => prev && prev.equals(curr))
        );
    }

    /**
     * Adds a {@link Predicate} to the Predicate root and updates the active Filter.
     * @param newPredicate Predicate that should be added to the search queries.
     * @returns the index of the added Predicate
     */
    public addPredicate(newPredicate: Predicate): number {
        return this._rootPredicate.addPredicate(newPredicate);
    }

    /**
     * Removes the {@link Predicate} object from the provided index. If the index is invalid does nothing.
     * Updates the the active Filter if the Predicate tree was affected.
     * @param index index of the Predicate that should be removed
     * @param clearInput whether the input, that corresponds to the predicate should be cleared
     */
    public removePredicate(index: number, clearInput = true): void {
        if (this._rootPredicate.removePredicate(index)) {
            this._predicateRemoved$.next({index, clearInput});
        }
    }

    /**
     * Removes all {@link Predicate} objects that contribute to the search. Updates the active Filter if it was affected.
     */
    public clearPredicates(): void {
        if (this._rootPredicate.getPredicateMap().size > 0) {
            for (const id of this._rootPredicate.getPredicateMap().keys()) {
                this.removePredicate(id);
            }
            this.updateActiveFilter();
        }
    }

    /**
     * Adds a {@link Filter} with the [fullText]{@link CaseSearchRequestBody#fullText} attribute set to the provided value.
     * If full text filter is already set, it will be replaced.
     * @param searchedSubstring value that should be searched on all full text fields
     */
    public setFullTextFilter(searchedSubstring: string): void {
        this._fullTextFilter = new SimpleFilter('', this._baseFilter.type, {fullText: searchedSubstring});
        this.updateActiveFilter();
    }

    /**
     * Clears the full text filter (if set). If the full text filter is not set, does nothing.
     */
    public clearFullTextFilter(): void {
        this._fullTextFilter = undefined;
        this.updateActiveFilter();
    }

    /**
     * Reads the current query from the predicate tree, combines it with the base Filter and full text Filter (if set)
     * and updates the active Filter.
     */
    protected updateActiveFilter(): void {
        let additionalFilter: Filter;
        if (!this._rootPredicate.query.isEmpty) {
            additionalFilter = new SimpleFilter('', this._baseFilter.type, {query: this._rootPredicate.query.value});
        }
        if (this._fullTextFilter) {
            if (additionalFilter) {
                additionalFilter = additionalFilter.merge(this._fullTextFilter, MergeOperator.AND);
            } else {
                additionalFilter = this._fullTextFilter;
            }
        }
        if (additionalFilter) {
            this._activeFilter.next(this._baseFilter.merge(additionalFilter, MergeOperator.AND));
        } else {
            this._activeFilter.next(this._baseFilter.clone());
        }
    }
}
