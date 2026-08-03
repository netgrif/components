import {Inject, Injectable, Injector, OnDestroy, Optional} from '@angular/core';
import {BooleanOperator} from '../models/boolean-operator';
import {Filter} from '../../filter/models/filter';
import {BehaviorSubject, forkJoin, Observable, Subject, Subscription} from 'rxjs';
import {Predicate} from '../models/predicate/predicate';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {MergeOperator} from '../../filter/models/merge-operator';
import {PredicateRemovalEvent} from '../models/predicate-removal-event';
import {Query} from '../models/query/query';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {EditableClausePredicateWithGenerators} from '../models/predicate/editable-clause-predicate-with-generators';
import {Category} from '../models/category/category';
import {PredicateTreeMetadata} from '../models/persistance/generator-metadata';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {BaseFilter} from '../models/base-filter';
import {LoggerService} from '../../logger/services/logger.service';
import {CategoryFactory} from '../category-factory/category-factory';
import {FilterType} from '../../filter/models/filter-type';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {FilterMetadata} from '../models/persistance/filter-metadata';
import {FilterTextSegment} from '../models/persistance/filter-text-segment';
import {QueryItem, QueryItemType} from "../../pfql/model/query-item-type";
import {parseQuery} from "../../pfql/pfql-utils";
import {LogicalOperator} from "../../pfql/model/logical-operator";
import {SimpleExpression} from "../../pfql/model/simple-expression";
import {ComplexExpression} from "../../pfql/model/complex-expression";
import {ResourceTypeQueryPrefix} from "../models/category/resource-type-query-prefix";

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
    protected _loadingFromMetadata$: LoadingEmitter;
    /**
     * The `rootPredicate` uses this stream to notify the search service about changes to the held query
     */
    private readonly _predicateQueryChanged$: Subject<void>;
    private readonly subFilter: Subscription;

    /**
     * The {@link Predicate} tree root uses an [AND]{@link BooleanOperator#AND} operator to combine the Predicates.
     * @param _log {@link LoggerService}
     * @param _categoryFactory a {@link CategoryFactory} instance. This dependency is optional.
     * It is required if we want to load predicate filter from saved metadata
     * @param baseFilter Filter that should be applied to the view when no searching is being performed.
     * Injected trough the {@link NAE_BASE_FILTER} injection token.
     * @param _injector injector from angular core
     */
    constructor(protected _log: LoggerService,
                @Optional() protected _categoryFactory: CategoryFactory,
                @Inject(NAE_BASE_FILTER) baseFilter: BaseFilter,
                protected _injector: Injector) {
        if (baseFilter.filter instanceof Filter) {
            this._baseFilter = baseFilter.filter.clone();
        } else if (baseFilter.filter instanceof Observable) {
            this._baseFilter = new SimpleFilter('', baseFilter.filterType, {process: {identifier: '__EMPTY__'}});
        } else {
            throw new Error('Unsupported BaseFilter input! You must provide the NAE_BASE_FILTER injection token with proper values!');
        }

        this._predicateQueryChanged$ = new Subject<void>();
        this._rootPredicate = new EditableClausePredicateWithGenerators(BooleanOperator.AND, this._predicateQueryChanged$, undefined, true);
        this._activeFilter = new BehaviorSubject<Filter>(this._baseFilter);
        this._predicateRemoved$ = new Subject<PredicateRemovalEvent>();
        this._loadingFromMetadata$ = new LoadingEmitter();

        if (baseFilter.filter instanceof Observable) {
            this.subFilter = baseFilter.filter.subscribe((filter) => {
                this._baseFilter = filter.clone();
                this.updateActiveFilter();
            });
        }

        this.predicateQueryChanged$.subscribe(() => {
            this.updateActiveFilter();
        });
    }

    ngOnDestroy(): void {
        this._predicateRemoved$.complete();
        this._activeFilter.complete();
        this._predicateQueryChanged$.complete();
        if (this.subFilter) {
            this.subFilter.unsubscribe();
        }
        this._loadingFromMetadata$.complete();
        this._rootPredicate.destroy();
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
     * @returns `true` if any visible predicates are applied.
     * Returns `false` if there are no predicates, or if there are only hidden predicates applied
     */
    public get hasVisiblePredicates(): boolean {
        for (const predicate of this._rootPredicate.getPredicateMap().values()) {
            if (predicate.isVisible) {
                return true;
            }
        }
        return false;
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
     * @returns the type of the filter held in this search service instance
     */
    public get filterType(): FilterType {
        return this.baseFilter.type;
    }

    /**
     * @returns whether the search service is currently loading its state from metadata or not.
     *
     * See [loadFromMetadata()]{@link SearchService#loadFromMetadata}
     */
    public get loadingFromMetadata(): boolean {
        return this._loadingFromMetadata$.value;
    }

    /**
     * @returns an `Observable` that emits `true` if the search service is currently loading its state from metadata,
     * emits `false` otherwise.
     *
     * See [loadFromMetadata()]{@link SearchService#loadFromMetadata}
     */
    public get loadingFromMetadata$(): Observable<boolean> {
        return this._loadingFromMetadata$.asObservable();
    }

    /**
     * @returns an Observable that emits whenever the root predicates query changes
     */
    protected get predicateQueryChanged$(): Observable<Query> {
        return this._predicateQueryChanged$.asObservable().pipe(
            map(() => this._rootPredicate.query),
            distinctUntilChanged((prev, curr) => prev && prev.equals(curr))
        );
    }

    /**
     * Adds a {@link Predicate} to the Predicate root and updates the active Filter.
     *
     * Predicates added this way will not be visible in the search GUI.
     * If you want to make sure your predicates are visible (and editable)
     * use the [addGeneratedLeafPredicate()]{@link SearchService#addGeneratedLeafPredicate} method instead.
     * @param newPredicate Predicate that should be added to the search queries.
     * @returns the index of the added Predicate
     */
    public addPredicate(newPredicate: Predicate): number {
        return this._rootPredicate.addPredicate(newPredicate, false);
    }

    /**
     * Adds a new hidden branch of the predicate tree with a singular leaf node containing the provided Query.
     *
     * This can be used to add predicates to the search tree (think header search),
     * which can be made visible and editable in the search GUI later.
     * @param generator the generator that is in such state, that it generates the Query, that should be added as branch/leaf.
     * If the generator doesn't currently generate a query a node with an empty query will be added.
     */
    public addGeneratedLeafPredicate(generator: Category<any>): number {
        const branchId = this._rootPredicate.addNewClausePredicate(BooleanOperator.OR, false);
        const branch = (
            this._rootPredicate.getPredicateMap().get(branchId).getWrappedPredicate() as unknown as EditableClausePredicateWithGenerators
        );
        branch.addNewPredicateFromGenerator(generator);
        return branchId;
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
     *
     * @param clearHidden whether the hidden predicates should be cleared as well
     */
    public clearPredicates(clearHidden = false): void {
        if (this._rootPredicate.getPredicateMap().size > 0) {
            for (const [id, predicate] of this._rootPredicate.getPredicateMap().entries()) {
                if (clearHidden || predicate.isVisible) {
                    this.removePredicate(id);
                }
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
        const whiteSpacedSubstring = searchedSubstring?.replace(/ /g, '\\ ');
        this._fullTextFilter = new SimpleFilter('', this._baseFilter.type, {fullText: whiteSpacedSubstring});
        this.updateActiveFilter();
    }

    /**
     * Clears the full text filter (if set). If the full text filter is not set, does nothing.
     */
    public clearFullTextFilter(): void {
        const wasFulltextSet = this._fullTextFilter !== undefined;
        this._fullTextFilter = undefined;
        if (wasFulltextSet) {
            this.updateActiveFilter();
        }
    }

    /**
     * Shows the predicates with the given ids. Skips ids that don't exist.
     * @param predicateIds the ids of the predicates that should be shown.
     */
    public show(predicateIds: Array<number>): void {
        this._rootPredicate.showPredicates(predicateIds);
    }

    /**
     * Reads the current query from the predicate tree, combines it with the base Filter and full text Filter (if set)
     * and updates the active Filter.
     */
    protected updateActiveFilter(): void {
        let additionalFilter: Filter;
        if (!this._rootPredicate.query.isEmpty) {
            additionalFilter = new SimpleFilter('', this._baseFilter.type, {query: this._rootPredicate.query.value},
                undefined, this._baseFilter.isPfql);
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

    /**
     * Loads whole new filter and search cases/tasks based on this filter
     * @param newFilter whole new filter that should be used for search
     */
    public updateWithFullFilter(newFilter: Filter): void {
        this._activeFilter.next(newFilter);
    }

    /**
     * @returns `undefined` if the predicate tree contains no complete query.
     * Otherwise returns the serialized form of the completed queries in the predicate tree.
     */
    public createPredicateMetadata(): PredicateTreeMetadata | undefined {
        return this._rootPredicate.createGeneratorMetadata() as PredicateTreeMetadata;
    }

    /**
     * Replaces the current predicate filter by the one corresponding to the provided generator metadata.
     *
     * The {@link CategoryFactory} instance must be provided for this service if we want to use this method. Logs an error and does nothing.
     *
     * The `filterType` of this search service must match the `filterType` of the provided metadata. Otherwise an error is thrown.
     *
     * @param metadata the serialized state of the predicate tree that should be restored to this search service
     */
    public loadFromMetadata(metadata: FilterMetadata) {
        if (this._categoryFactory === null) {
            this._log.error('A CategoryFactory instance must be provided for the SearchService'
                + ' if you want to reconstruct a predicate filter from saved metadata');
            return;
        }

        if (metadata.filterType !== this.filterType) {
            throw Error(`The filter type of the provided metadata (${metadata.filterType
            }) does not match the filter type of the search service (${this.filterType})!`);
        }

        this.clearPredicates(true);
        this._loadingFromMetadata$.on();

        const generatorObservables = [];
        if (Array.isArray(metadata.predicateMetadata)) {
            for (const clause of metadata.predicateMetadata) {
                const branchId = this._rootPredicate.addNewClausePredicate(BooleanOperator.OR);
                const branchPredicate = (
                    this._rootPredicate.getPredicateMap().get(branchId)
                        .getWrappedPredicate() as unknown as EditableClausePredicateWithGenerators
                );
                for (const predicate of clause) {
                    const localBranchReference = branchPredicate;
                    generatorObservables.push(
                        this._categoryFactory.getFromMetadata(predicate).pipe(tap(generator => {
                            localBranchReference.addNewPredicateFromGenerator(generator);
                        }))
                    );
                }
            }
        }

        forkJoin(generatorObservables).subscribe(() => {
            this._loadingFromMetadata$.off();
            this.updateActiveFilter();
        });
    }

    /**
     * Loads a PFQL query string into the search service's predicate tree structure.
     *
     * Parses the provided PFQL query and reconstructs the predicate tree from it.
     * The query resource type must match the filter type of this search service.
     * All existing predicates (including hidden ones) are cleared before loading the new query.
     *
     * @param query the PFQL query string to parse and load into the predicate tree
     */
    public loadFromPfql(query: string) {
        if (!query) {
            this._log.warn("No query was provided. Cannot load the filter");
            return;
        }
        if (!this.validateQueryResourceType(query)) {
            this._log.error("Query resource type is of wrong type");
            return;
        }

        this.clearPredicates(true);
        this._loadingFromMetadata$.on();
        const queryItems: Array<QueryItem> = parseQuery(query, this._injector);
        if (!queryItems) {
            this._log.warn(`Could not parse query '${query}. Clearing the search...`)
            return;
        }

        const categoryLoadings$ = this.loadExpressionsIntoPredicate(this._rootPredicate, BooleanOperator.AND, queryItems);
        if (categoryLoadings$.length === 0) {
            this._loadingFromMetadata$.off();
            this.updateActiveFilter();
            return;
        }
        forkJoin(categoryLoadings$).subscribe(() => {
            this._loadingFromMetadata$.off();
            this.updateActiveFilter();
        });
    }

    /**
     * Validates that the resource type prefix in the PFQL query matches the filter type of this search service.
     *
     * @param query the PFQL query string to validate
     * @returns `true` if the query's resource type prefix matches the search service's filter type, `false` otherwise
     */
    protected validateQueryResourceType(query: string): boolean {
        const filterType = this.baseFilter.type;
        return filterType === FilterType.CASE ? query.startsWith(ResourceTypeQueryPrefix.CASES) || query.startsWith(ResourceTypeQueryPrefix.CASE)
            : query.startsWith(ResourceTypeQueryPrefix.TASKS) || query.startsWith(ResourceTypeQueryPrefix.TASK);
    }

    /**
     * @returns an Array of filter text segments that correspond to the currently displayed completed predicates
     */
    public createFilterTextSegments(): Array<FilterTextSegment> {
        return this._rootPredicate.createFilterTextSegments();
    }

    /**
     * Recursively loads query items (expressions and operators) into a predicate tree node.
     *
     * Processes simple expressions by loading them into predicates (creating branch predicates for AND operators),
     * and recursively handles complex expressions by creating new nested predicates.
     *
     * @param predicate the predicate node into which the expressions should be loaded
     * @param operatorOfPredicate the boolean operator used by the predicate node
     * @param items the array of query items (expressions and operators) to process
     * @returns an array of observables that emit when category data is loaded for each simple expression
     */
    protected loadExpressionsIntoPredicate(predicate: EditableClausePredicateWithGenerators, operatorOfPredicate: BooleanOperator,
                                           items: Array<QueryItem>): Array<Observable<void>> {
        const expressions: Array<QueryItem> = items.filter(item => item.type() !== QueryItemType.LOGICAL_OPERATOR);
        const categoryLoadings$: Array<Observable<void>> = [];
        for (const expression of expressions) {
            if (expression.type() === QueryItemType.SIMPLE_EXPRESSION) {
                let categoryLoading$: Observable<void>;
                if (operatorOfPredicate.valueOf() === BooleanOperator.AND.valueOf()) {
                    const branchId = predicate.addNewClausePredicate(BooleanOperator.OR);
                    const localPredicate = predicate.getPredicateMap().get(branchId).getWrappedPredicate() as unknown as EditableClausePredicateWithGenerators;
                    categoryLoading$ = this.loadSimpleExpressionIntoPredicate(localPredicate, expression as SimpleExpression);
                } else {
                    categoryLoading$ = this.loadSimpleExpressionIntoPredicate(predicate, expression as SimpleExpression);
                }
                categoryLoadings$.push(categoryLoading$);
            } else if (expression.type() === QueryItemType.COMPLEX_EXPRESSION) {
                this.loadFromQueryItemsIntoNewPredicate(predicate, (expression as ComplexExpression).items);
            }
        }
        return categoryLoadings$;
    }

    /**
     * Creates a new branch predicate under the parent and loads query items into it.
     *
     * Determines the appropriate boolean operator from the query items, creates a new clause predicate
     * with that operator, and recursively loads the expressions into the new predicate.
     *
     * @param parentPredicate the parent predicate under which to create the new branch
     * @param items the array of query items to load into the new predicate branch
     * @returns an array of observables that emit when category data is loaded for each simple expression
     */
    protected loadFromQueryItemsIntoNewPredicate(parentPredicate: EditableClausePredicateWithGenerators,
                                                 items: Array<QueryItem>): Array<Observable<void>> {
        const booleanOperator: BooleanOperator = this.determineBooleanOperator(items);
        const branchId = parentPredicate.addNewClausePredicate(booleanOperator);
        const branchPredicate = parentPredicate.getPredicateMap().get(branchId).getWrappedPredicate() as unknown as EditableClausePredicateWithGenerators
        return this.loadExpressionsIntoPredicate(branchPredicate, booleanOperator, items);
    }

    /**
     * Determines the boolean operator to use for combining query items.
     *
     * Extracts logical operators from the query items array. If no logical operators are found,
     * defaults to AND. If logical operators are present, uses the first one found.
     *
     * @param items the array of query items to examine
     * @returns the boolean operator (AND or OR) determined from the query items
     */
    protected determineBooleanOperator(items: Array<QueryItem>): BooleanOperator {
        const booleanOperators = items.filter(item => item.type() === QueryItemType.LOGICAL_OPERATOR);
        return booleanOperators.length === 0 ? BooleanOperator.AND : (booleanOperators[0] as LogicalOperator).value;
    }

    /**
     * Loads a simple PFQL expression into a predicate node.
     *
     * Extracts the category from the simple expression, loads the expression data into the category,
     * and adds the category as a new predicate generator to the given predicate node.
     *
     * @param predicate the predicate node into which the simple expression should be loaded
     * @param simpleExpr the simple expression to load
     * @returns an observable that emits when the category data has been loaded from the expression
     */
    protected loadSimpleExpressionIntoPredicate(predicate: EditableClausePredicateWithGenerators, simpleExpr: SimpleExpression): Observable<void> {
        const category: Category<any> = simpleExpr.category;
        const categoryLoading$: Observable<void> = category.loadFromPfqlExpression(simpleExpr);
        predicate.addNewPredicateFromGenerator(category);
        return categoryLoading$;
    }
}
