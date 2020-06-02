import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, timer} from 'rxjs';
import {TaskPanelData} from '../../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../../data-fields/models/changed-fields';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../user/services/user.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {SortableViewWithAllowedNets} from '../../abstract/sortable-view-with-allowed-nets';
import {Net} from '../../../process/net';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {Pagination} from '../../../resources/interface/pagination';
import {Task} from '../../../resources/interface/task';
import {LanguageService} from '../../../translate/language.service';
import {SearchService} from '../../../search/search-service/search.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ListRange} from '@angular/cdk/collections';


@Injectable()
export class TaskViewService extends SortableViewWithAllowedNets {

    protected _tasks$: Observable<Array<TaskPanelData>>;
    protected _changedFields$: Subject<ChangedFields>;
    protected _requestedPage$: BehaviorSubject<number>;
    protected _loading$: LoadingEmitter;
    protected _endOfData: boolean;
    protected _pagination: Pagination;

    /**
     * @ignore
     * Used to decide if the mongo endpoint should be used instead
     */
    private readonly _parentCaseId: string = undefined;
    private readonly _initializing: boolean = true;
    private readonly _taskArray: Array<TaskPanelData>;
    private _clear = false;

    constructor(protected _taskService: TaskResourceService, private _userService: UserService,
                private _snackBarService: SnackBarService, private _translate: TranslateService,
                private _Language: LanguageService, protected _searchService: SearchService,
                private _log: LoggerService,
                allowedNets: Observable<Array<Net>> = of([])) { // need for translations
        super(allowedNets);
        this._taskArray = [];
        this._tasks$ = new Subject<Array<TaskPanelData>>();
        this._loading$ = new LoadingEmitter();
        this._changedFields$ = new Subject<ChangedFields>();
        this._requestedPage$ = new BehaviorSubject<number>(null);
        this._endOfData = false;
        this._pagination = {
            size: 25,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };

        const baseFilter = this._searchService.baseFilter;
        if (baseFilter instanceof SimpleFilter) {
            const keys = Object.keys(baseFilter.getRequestBody());
            if (keys.length === 1 && keys[0] === 'case' && typeof baseFilter.getRequestBody()[keys[0]] === 'string') {
                this._parentCaseId = baseFilter.getRequestBody()[keys[0]];
            }
        }
        this._initializing = false;

        this._searchService.activeFilter$.subscribe(() => {
            this.reload();
        });

        const tasksMap$ = this._requestedPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._tasks$ = tasksMap$.pipe(
            map(v => Object.values(v))
        );
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

    public loadPage(page: number): Observable<{ [k: string]: TaskPanelData }> {
        if (this._loading$.isActive || page === null || page === undefined || page < 0 || this._clear) {
            return of({});
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, page);
        this._loading$.on();
        const endpointCall = !this._searchService.additionalFiltersApplied && !!this._parentCaseId ?
            this._taskService.getTasks({case: this._parentCaseId}, params) :
            this._taskService.searchTask(this._searchService.activeFilter, params);
        return endpointCall.pipe(
            catchError(err => {
                this._log.error('Loading tasks has failed!', err);
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(t => this._endOfData = !Array.isArray(t.content) ||
                (Array.isArray(t.content) && t.content.length === 0) ||
                t.pagination.number === t.pagination.totalPages),
            map(tasks => Array.isArray(tasks.content) ? tasks : {...tasks, content: []}),
            map(tasks => {
                this._pagination = tasks.pagination;
                return tasks.content.reduce((acc, curr) => {
                    this.blockTaskFields(curr, !(curr.user && curr.user.email === this._userService.user.email));
                    return {
                        ...acc, [curr.stringId]: {
                            task: curr,
                            changedFields: this._changedFields$
                        }
                    };
                }, {});
            }),
            tap(_ => this._loading$.off())
        );
    }

    public loadTasks() {
        if (this._loading$.isActive || this._initializing) {
            return;
        }
        this._loading$.on();
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);

        // TODO 12.5.2020 - better solution for mongo searching
        if (!this._searchService.additionalFiltersApplied && !!this._parentCaseId) {
            this._taskService.getTasks({case: this._parentCaseId}, params).subscribe(tasks => this.processTasks(tasks.content),
                error => this.processError());
        } else {
            // TODO 7.4.2020 - task sorting is currently not supported, see case view for implementation
            this._taskService.searchTask(this._searchService.activeFilter).subscribe(tasks => this.processTasks(tasks.content),
                error => this.processError());
        }
    }

    private processTasks(tasks: Array<Task>): void {
        if (tasks instanceof Array) {
            if (this._taskArray.length) {
                tasks = this.resolveUpdate(tasks);
            }
            tasks.forEach(task => {
                this._taskArray.push({
                    task,
                    changedFields: this._changedFields$
                });
            });
        } else {
            this._taskArray.splice(0, this._taskArray.length);
            this._snackBarService.openWarningSnackBar(this._translate.instant('tasks.snackbar.noTasksFound'));
        }
        this._loading$.off();
        // this._tasks$.next(this._taskArray);
    }

    private processError(): void {
        this._snackBarService.openErrorSnackBar(
            this._translate.instant('tasks.snackbar.failedToLoad')
        );
        this._loading$.off();
    }

    private resolveUpdate(tasks) {
        const tasksToDelete = []; // saved are only indexes for work later
        this._taskArray.forEach((item, i) => {
            const index = tasks.findIndex(r => r.caseId === item.task.caseId && r.transitionId === item.task.transitionId);
            if (index === -1) {
                tasksToDelete.push(i);
            } else {
                Object.keys(this._taskArray[i].task).forEach(key => {
                    if (tasks[index][key] !== undefined) {
                        this._taskArray[i].task[key] = tasks[index][key];
                    }
                });
                this.blockFields(!(this._taskArray[i].task.user && this._taskArray[i].task.user.email === this._userService.user.email), i);
                this._taskArray[i].changedFields = this._changedFields$;
                tasks.splice(index, 1);
            }
        });
        tasksToDelete.sort((a, b) => b - a);
        tasksToDelete.forEach(index => {
            this._taskArray.splice(index, 1);
        });
        return tasks;
    }

    private blockTaskFields(task: Task, block: boolean): void {
        if (!task.dataGroups) {
            return;
        }
        task.dataGroups.forEach(g => g.fields.forEach(f => f.block = block));
    }

    private blockFields(bool: boolean, index: number) {
        if (this._taskArray[index].task.dataGroups) {
            this._taskArray[index].task.dataGroups.forEach(group => {
                group.fields.forEach(field => {
                    field.block = bool;
                });
            });
        }
    }

    public nextPage(renderedRange: ListRange, totalLoaded: number): void {
        if (this._loading$.isActive || this._endOfData) {
            return;
        }

        // if (renderedRange.start === 0) {
        //     this._requestedPage$.next(this._pagination.number - 1);
        // } else
        if (renderedRange.end === totalLoaded) {
            this._requestedPage$.next(this._pagination.number + 1);
        }
    }

    public reload(): void {
        if (!this._tasks$ || !this._pagination) {
            return;
        }
        this._clear = true;
        this._pagination.number = -1;
        this._endOfData = false;
        const range = {
            start: -1,
            end: 0
        };
        this.nextPage(range, 0);
        timer(100).subscribe(_ => {
            this._pagination.number = -1;
            this.nextPage(range, 0);
        });
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
