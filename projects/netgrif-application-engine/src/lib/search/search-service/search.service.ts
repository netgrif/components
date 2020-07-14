import {Injectable} from '@angular/core';
import {ClausePredicate} from '../models/predicate/clause-predicate';
import {BooleanOperator} from '../models/boolean-operator';
import {Filter} from '../../filter/models/filter';
import {BehaviorSubject, Observable} from 'rxjs';
import {Predicate} from '../models/predicate/predicate';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {MergeOperator} from '../../filter/models/merge-operator';

/**
 * Holds information about the filter that is currently applied to the view component, that provides this services.
 */
@Injectable()
export class SearchService {

    /**
     * {@link Filter} that is applied to the view, even if the user doesn't search anything.
     */
    protected _baseFilter: Filter;
    /**
     * Holds the {@link Predicate} tree root for user search queries.
     */
    protected _rootPredicate: ClausePredicate;
    /**
     * Holds the {@link Filter} that is currently being applied to the view.
     */
    protected _activeFilter: BehaviorSubject<Filter>;
    /**
     * Holds the full text {@link Filter} if set, `undefined` otherwise.
     */
    protected _fullTextFilter: SimpleFilter | undefined;

    /**
     * The {@link Predicate} tree root uses an [AND]{@link BooleanOperator#AND} operator to combine the Predicates.
     * @param baseFilter Filter that should be applied to the view when no searching is being performed.
     */
    constructor(baseFilter: Filter) {
        this._baseFilter = baseFilter.clone();
        this._rootPredicate = new ClausePredicate([], BooleanOperator.AND);
        this._activeFilter = new BehaviorSubject<Filter>(this._baseFilter);
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
     * Adds a {@link Predicate} to the Predicate root and updates the active Filter.
     * @param newPredicate Predicate that should be added to the search queries.
     * @returns the index of the added Predicate
     */
    public addPredicate(newPredicate: Predicate): number {
        const r = this._rootPredicate.addPredicate(newPredicate);
        this.updateActiveFilter();
        return r;
    }

    /**
     * Removes the {@link Predicate} object from the provided index. If the index is invalid does nothing.
     * Updates the the active Filter if the Predicate tree was affected.
     * @param index index of the Predicate that should be removed
     */
    public removePredicate(index: number): void {
        if (this._rootPredicate.removePredicate(index)) {
            this.updateActiveFilter();
        }
    }

    /**
     * Adds a {@link Filter} with the [fullText]{@link CaseSearchRequestBody#fullText} attribute set to the provided value.
     * If full text filter is already set, it will be replaced.
     * @param searchedSubstring value that should be searched on all full text fields
     */
    public addFullTextFilter(searchedSubstring: string): void {
        this._fullTextFilter = new SimpleFilter('', this._baseFilter.type, {fullText: searchedSubstring});
        this.updateActiveFilter();
    }

    /**
     * Clears the full text filter.
     */
    public removeFullTextFilter(): void {
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
