import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, Subscription, timer} from 'rxjs';
import {TaskPanelData} from '../../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../user/services/user.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, concatMap, filter, map, mergeMap, scan, switchMap, take, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Pagination} from '../../../resources/interface/pagination';
import {Task} from '../../../resources/interface/task';
import {SearchService} from '../../../search/search-service/search.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ListRange} from '@angular/cdk/collections';
import {UserComparatorService} from '../../../user/services/user-comparator.service';
import {TaskEndpoint} from '../models/task-endpoint';
import {Page} from '../../../resources/interface/page';
import {NAE_PREFERRED_TASK_ENDPOINT} from '../models/injection-token-task-endpoint';
import {PageLoadRequestContext} from '../../abstract/page-load-request-context';
import {Filter} from '../../../filter/models/filter';
import {TaskPageLoadRequestResult} from '../models/task-page-load-request-result';
import {LoadingWithFilterEmitter} from '../../../utility/loading-with-filter-emitter';
import {arrayToObservable} from '../../../utility/array-to-observable';
import {SearchIndexResolverService} from '../../../search/search-keyword-resolver-service/search-index-resolver.service';
import {SortableView} from '../../abstract/sortable-view';
import {NAE_TASK_VIEW_CONFIGURATION} from '../models/task-view-configuration-injection-token';
import {TaskViewConfiguration} from '../models/task-view-configuration';
import {ChangedFieldsMap} from '../../../event/services/interfaces/changed-fields-map';


@Injectable()
export class TaskViewService extends SortableView implements OnDestroy {

    protected _tasks$: Observable<Array<TaskPanelData>>;
    protected _changedFields$: Subject<ChangedFieldsMap>;
    protected _requestedPage$: BehaviorSubject<PageLoadRequestContext>;
    protected _loading$: LoadingWithFilterEmitter;
    protected _endOfData: boolean;
    protected _pagination: Pagination;
    protected _initiallyOpenOneTask: boolean;
    protected _closeTaskTabOnNoTasks: boolean;
    protected _panelUpdate$: BehaviorSubject<Array<TaskPanelData>>;
    protected _closeTab$: ReplaySubject<void>;
    protected _subInitiallyOpen: Subscription;
    protected _subCloseTask: Subscription;
    protected _subSearch: Subscription;

    // Serializing assign after cancel
    protected _allowMultiOpen: boolean;

    private readonly _initializing: boolean = true;

    constructor(protected _taskService: TaskResourceService,
                private _userService: UserService,
                private _snackBarService: SnackBarService,
                private _translate: TranslateService,
                protected _searchService: SearchService,
                private _log: LoggerService,
                private _userComparator: UserComparatorService,
                resolver: SearchIndexResolverService,
                @Optional() @Inject(NAE_PREFERRED_TASK_ENDPOINT) protected readonly _preferredEndpoint: TaskEndpoint = null,
                @Optional() @Inject(NAE_TASK_VIEW_CONFIGURATION) taskViewConfig: TaskViewConfiguration = null) {
        super(resolver);
        this._tasks$ = new Subject<Array<TaskPanelData>>();
        this._loading$ = new LoadingWithFilterEmitter();
        this._changedFields$ = new Subject<ChangedFieldsMap>();
        this._allowMultiOpen = true;
        this._endOfData = false;
        this._pagination = {
            size: 50,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._requestedPage$ = new BehaviorSubject<PageLoadRequestContext>(
            new PageLoadRequestContext(this.activeFilter, Object.assign({}, this._pagination, {number: 0}))
        );
        this._panelUpdate$ = new BehaviorSubject<Array<TaskPanelData>>([]);
        this._closeTab$ = new ReplaySubject<void>(1);
        this._preferredEndpoint = taskViewConfig?.preferredEndpoint ?? (this._preferredEndpoint ?? TaskEndpoint.MONGO);

        this._initializing = false;

        this._subSearch = this._searchService.activeFilter$.subscribe(() => {
            this.reload();
        });

        const tasksMap$ = this._requestedPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            map(pageLoadResult => {
                if (pageLoadResult.requestContext && pageLoadResult.requestContext.clearLoaded) {
                    // we set an empty value to the virtual scroll and then replace it by the real value forcing it to redraw its content
                    const results = [{tasks: {}, requestContext: null}, pageLoadResult];
                    return arrayToObservable(results);
                } else {
                    return of(pageLoadResult);
                }
            }),
            concatMap(o => o),
            scan((acc, pageLoadResult) => {
                let result: { [k: string]: TaskPanelData };
                if (pageLoadResult.requestContext === null) {
                    return pageLoadResult.tasks;
                }

                if (pageLoadResult.requestContext.reloadCurrentTaskPage) {
                    Object.keys(acc).forEach(taskId => {
                        if (!pageLoadResult.tasks[taskId]) {
                            delete acc[taskId];
                        } else {
                            pageLoadResult.tasks[taskId].task.dataGroups = acc[taskId].task.dataGroups;
                            pageLoadResult.tasks[taskId].initiallyExpanded = acc[taskId].initiallyExpanded;
                            this.updateTask(acc[taskId].task, pageLoadResult.tasks[taskId].task);
                            this.blockTaskFields(acc[taskId].task, !(acc[taskId].task.user
                                && this._userComparator.compareUsers(acc[taskId].task.user)));
                            delete pageLoadResult.tasks[taskId];
                        }
                    });
                    result = Object.assign(acc, pageLoadResult.tasks);
                } else {
                    result = {...acc, ...pageLoadResult.tasks};
                }

                Object.assign(this._pagination, pageLoadResult.requestContext.pagination);
                if (pageLoadResult.requestContext !== null) {
                    this._loading$.off(pageLoadResult.requestContext.filter);
                }
                return result;
            }, {})
        );
        this._tasks$ = tasksMap$.pipe(
            map(v => Object.values(v) as Array<TaskPanelData>),
            map(taskArray => {
                if (taskArray.length === 1 && this._initiallyOpenOneTask) {
                    taskArray[0].task.finishDate === undefined ?
                        taskArray[0].initiallyExpanded = true :
                        taskArray[0].initiallyExpanded = false;
                }
                return taskArray;
            }),
            tap(v => this._panelUpdate$.next(v)));

        this._subInitiallyOpen = (taskViewConfig?.initiallyOpenOneTask ?? of(true)).subscribe(bool => {
            this._initiallyOpenOneTask = bool;
        });

        this._subCloseTask = (taskViewConfig?.closeTaskTabOnNoTasks ?? of(true)).subscribe(bool => {
            this._closeTaskTabOnNoTasks = bool;
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._changedFields$.complete();
        this._requestedPage$.complete();
        this._panelUpdate$.complete();
        this._closeTab$.complete();
        this._subInitiallyOpen.unsubscribe();
        this._subCloseTask.unsubscribe();
        this._subSearch.unsubscribe();
    }

    public get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }

    public get changedFields$(): Subject<ChangedFieldsMap> {
        return this._changedFields$;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get panelUpdate(): Observable<Array<TaskPanelData>> {
        return this._panelUpdate$.asObservable();
    }

    public get closeTab(): Observable<void> {
        return this._closeTab$.asObservable();
    }

    protected get activeFilter(): Filter {
        return this._searchService.activeFilter;
    }

    public set allowMultiOpen(bool: boolean) {
        this._allowMultiOpen = bool;
    }

    public get allowMultiOpen(): boolean {
        return this._allowMultiOpen;
    }

    public loadPage(requestContext: PageLoadRequestContext): Observable<TaskPageLoadRequestResult> {
        if (requestContext === null || requestContext.pageNumber < 0) {
            return of({tasks: {}, requestContext});
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, requestContext.pagination);
        this._loading$.on(requestContext.filter);

        let request: Observable<Page<Task>>;
        if (requestContext.filter.bodyContainsQuery() || this._preferredEndpoint === TaskEndpoint.ELASTIC) {
            request = timer(200).pipe(
                switchMap(() => this._taskService.searchTask(requestContext.filter, params).pipe(take(1)))
            );
        } else {
            request = this._taskService.getTasks(requestContext.filter, params).pipe(take(1));
        }
        return request.pipe(
            catchError(err => {
                this._log.error('Loading tasks has failed!', err);
                this._loading$.off(requestContext.filter);
                return of({content: [], pagination: {...this._pagination}});
            }),
            filter(() => {
                const r = requestContext.filter === this._searchService.activeFilter;
                if (!r) {
                    this._loading$.off(requestContext.filter);
                    this._log.debug('Received tasks page is no longer relevant since the active filter has changed before it could arrive.'
                        + ' Discarding...');
                }
                return r;
            }),
            tap(t => {
                Object.assign(requestContext.pagination, t.pagination);
            }),
            tap(t => {
                if (this._pagination.totalElements && this._pagination.totalElements > 0
                    && t.pagination.totalElements === 0 && !Array.isArray(t.content) && this._closeTaskTabOnNoTasks) {
                    this._closeTab$.next();
                }
            }),
            tap(t => {
                this._endOfData = !Array.isArray(t.content)
                    || t.content.length === 0
                    || t.pagination.number === t.pagination.totalPages;
            }),
            map(tasks => Array.isArray(tasks.content) ? tasks : {...tasks, content: []}),
            map(tasks => {
                return tasks.content.reduce((acc, curr) => {
                    this.blockTaskFields(curr, !(curr.user && this._userComparator.compareUsers(curr.user)));
                    return {
                        ...acc, [curr.stringId]: {
                            task: curr,
                            changedFields: this._changedFields$,
                            initiallyExpanded: false
                        }
                    };
                }, {});
            }),
            map(tasks => ({tasks, requestContext}))
        );
    }

    private updateTask(old: Task, neww: Task) {
        Object.keys(old).forEach(key => {
            if (!neww.hasOwnProperty(key)) {
                delete old[key];
            }
        });
        Object.keys(neww).forEach(key => {
            if (neww[key] !== undefined && neww[key] !== null) {
                old[key] = neww[key];
            }
        });
        this.blockTaskFields(old, !(old.user && this._userComparator.compareUsers(old.user)));
    }

    private blockTaskFields(task: Task, block: boolean): void {
        if (!task.dataGroups) {
            return;
        }
        task.dataGroups.forEach(g => g.fields.forEach(f => f.block = block));
    }

    public nextPage(renderedRange: ListRange, totalLoaded: number, requestContext?: PageLoadRequestContext): void {
        if (requestContext === undefined) {
            requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination);
            requestContext.pagination.number += 1;
        }

        if (this.isLoadingRelevantFilter(requestContext) || this._endOfData) {
            return;
        }

        if (renderedRange.end === totalLoaded) {
            this._requestedPage$.next(requestContext);
        }
    }

    private isLoadingRelevantFilter(requestContext?: PageLoadRequestContext): boolean {
        return requestContext === undefined || (this._loading$.isActiveWithFilter(requestContext.filter) && !requestContext.force);
    }

    public reload(): void {
        if (!this._tasks$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        const requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination, true);
        requestContext.pagination.number = 0;
        const range = {
            start: -1,
            end: 0
        };

        this.nextPage(range, 0, requestContext);
    }

    public reloadCurrentPage(force?: boolean): void {
        if (!this._tasks$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        const requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination, false, true, force);
        requestContext.pagination.number = 0; // TODO [BUG] - Reloading only first page
        const range = {
            start: -1,
            end: 0
        };
        this.nextPage(range, 0, requestContext);
    }

    protected getMetaFieldSortId(): string {
        // TODO Tasks were not sortable on old frontend sorting might require elastic mapping changes on backend
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        return 'priority,desc';
    }

    protected addPageParams(params: HttpParams, pagination: Pagination): HttpParams {
        params = params.set('size', pagination.size + '');
        params = params.set('page', pagination.number + '');
        return params;
    }
}
