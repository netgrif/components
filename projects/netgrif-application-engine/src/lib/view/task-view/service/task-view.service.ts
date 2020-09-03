import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, timer} from 'rxjs';
import {TaskPanelData} from '../../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../../data-fields/models/changed-fields';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../user/services/user.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, filter, map, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {SortableViewWithAllowedNets} from '../../abstract/sortable-view-with-allowed-nets';
import {Net} from '../../../process/net';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {Pagination} from '../../../resources/interface/pagination';
import {Task} from '../../../resources/interface/task';
import {SearchService} from '../../../search/search-service/search.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ListRange} from '@angular/cdk/collections';
import {UserComparatorService} from '../../../user/services/user-comparator.service';
import {TaskEndpoint} from '../models/task-endpoint';
import {Page} from '../../../resources/interface/page';
import {NAE_PREFERRED_TASK_ENDPOINT} from '../models/injection-token-task-endpoint';
import {TaskPageLoadRequestContext} from '../models/task-page-load-request-context';
import {Filter} from '../../../filter/models/filter';
import {TaskPageLoadRequestResult} from '../models/task-page-load-request-result';


@Injectable()
export class TaskViewService extends SortableViewWithAllowedNets {

    protected _tasks$: Observable<Array<TaskPanelData>>;
    protected _changedFields$: Subject<ChangedFields>;
    protected _requestedPage$: ReplaySubject<TaskPageLoadRequestContext>;
    protected _loading$: LoadingEmitter;
    protected _endOfData: boolean;
    protected _pagination: Pagination;
    protected _initiallyOpenOneTask: boolean;
    protected _closeTaskTabOnNoTasks: boolean;

    // Kovy fix
    protected _panelUpdate$: BehaviorSubject<Array<TaskPanelData>>;
    protected _closeTab$: ReplaySubject<void>;

    private readonly _initializing: boolean = true;

    constructor(protected _taskService: TaskResourceService,
                private _userService: UserService,
                private _snackBarService: SnackBarService,
                private _translate: TranslateService,
                protected _searchService: SearchService,
                private _log: LoggerService,
                private _userComparator: UserComparatorService,
                @Optional() @Inject(NAE_PREFERRED_TASK_ENDPOINT) protected readonly _preferredEndpoint: TaskEndpoint,
                allowedNets: Observable<Array<Net>> = of([]),
                initiallyOpenOneTask: Observable<boolean> = of(true),
                closeTaskTabOnNoTasks: Observable<boolean> = of(true)) {
        super(allowedNets);
        this._tasks$ = new Subject<Array<TaskPanelData>>();
        this._loading$ = new LoadingEmitter();
        this._changedFields$ = new Subject<ChangedFields>();
        this._requestedPage$ = new ReplaySubject<TaskPageLoadRequestContext>(1);
        this._endOfData = false;
        this._pagination = {
            size: 50,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._panelUpdate$ = new BehaviorSubject<Array<TaskPanelData>>([]);
        this._closeTab$ = new ReplaySubject<void>(1);
        if (this._preferredEndpoint === undefined || this._preferredEndpoint === null) {
            this._preferredEndpoint = TaskEndpoint.MONGO;
        }

        this._initializing = false;

        this._searchService.activeFilter$.subscribe(() => {
            this.reload();
        });

        const tasksMap$ = this._requestedPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, pageLoadResult) => {
                let result: { [k: string]: TaskPanelData };
                if (pageLoadResult.requestContext.clearLoadedTasks) {
                    result = {...pageLoadResult.tasks};
                } else if (pageLoadResult.requestContext.reloadCurrentPage) {
                    Object.keys(acc).forEach(taskId => {
                        if (!pageLoadResult.tasks[taskId]) {
                            delete acc[taskId];
                        } else {
                            this.updateTask(acc[taskId].task, pageLoadResult.tasks[taskId].task);
                            pageLoadResult.tasks[taskId].task.dataGroups = acc[taskId].task.dataGroups;
                            pageLoadResult.tasks[taskId].initiallyExpanded = acc[taskId].initiallyExpanded;
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

        initiallyOpenOneTask.subscribe(bool => {
            this._initiallyOpenOneTask = bool;
        });

        closeTaskTabOnNoTasks.subscribe(bool => {
            this._closeTaskTabOnNoTasks = bool;
        });
    }

    public get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }

    public get changedFields$(): Subject<ChangedFields> {
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

    public loadPage(requestContext: TaskPageLoadRequestContext): Observable<TaskPageLoadRequestResult> {
        if (this.isLoadingRelevantFilter(requestContext)
            || requestContext.pageNumber === null
            || requestContext.pageNumber === undefined
            || requestContext.pageNumber < 0) {
            return of({tasks: {}, requestContext});
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, requestContext.pageNumber);
        this._loading$.on();

        let request: Observable<Page<Task>>;
        if (requestContext.filter.bodyContainsQuery() || this._preferredEndpoint === TaskEndpoint.ELASTIC) {
            request = timer(200).pipe(
                switchMap(() => this._taskService.searchTask(requestContext.filter, params))
            );
        } else {
            request = this._taskService.getTasks(requestContext.filter, params);
        }
        return request.pipe(
            catchError(err => {
                this._log.error('Loading tasks has failed!', err);
                return of({content: [], pagination: {...this._pagination}});
            }),
            filter(() => {
                const r = requestContext.filter === this._searchService.activeFilter;
                if (!r) {
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
                    && t.pagination.totalElements === 0 && !Array.isArray(t.content)) {
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
            map(tasks => ({tasks, requestContext})),
            tap(_ => this._loading$.off())
        );
    }

    private updateTask(old: Task, neww: Task) {
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

    public nextPage(renderedRange: ListRange, totalLoaded: number, requestContext?: TaskPageLoadRequestContext): void {
        if (this.isLoadingRelevantFilter(requestContext) || this._endOfData) {
            return;
        }

        if (renderedRange.end === totalLoaded) {
            if (requestContext === undefined) {
                requestContext = new TaskPageLoadRequestContext(this.activeFilter, this._pagination);
                requestContext.pagination.number += 1;
            }
            this._requestedPage$.next(requestContext);
        }
    }

    private isLoadingRelevantFilter(requestContext?: TaskPageLoadRequestContext): boolean {
        return this._loading$.isActive && (requestContext === undefined || requestContext.filter === this._searchService.activeFilter);
    }

    public reload(): void {
        if (!this._tasks$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        const requestContext = new TaskPageLoadRequestContext(this.activeFilter, this._pagination, true);
        requestContext.pagination.number = 0;
        const range = {
            start: -1,
            end: 0
        };

        this.nextPage(range, 0, requestContext);
    }

    public reloadCurrentPage(): void {
        if (!this._tasks$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        const requestContext = new TaskPageLoadRequestContext(this.activeFilter, this._pagination, false, true);
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

    protected addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set('size', this._pagination.size + '');
        page = page !== null ? page : this._pagination.number;
        params = params.set('page', page + '');
        return params;
    }
}
