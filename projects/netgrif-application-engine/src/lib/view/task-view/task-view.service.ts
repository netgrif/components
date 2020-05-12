import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../user/services/user.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../translate/language.service';
import {SortableView} from '../abstract/sortable-view';
import {SearchService} from '../../search/search-service/search.service';
import {Task} from '../../resources/interface/task';
import {SimpleFilter} from '../../filter/models/simple-filter';


@Injectable()
export class TaskViewService extends SortableView {
    taskArray: Array<TaskPanelData>;
    taskData: Subject<Array<TaskPanelData>>;
    changedFields: Subject<ChangedFields>;
    loading: BehaviorSubject<boolean>;

    /**
     * @ignore
     * Used to decide if the mongo endpoint should be used instead
     */
    private readonly _parentCaseId: string = undefined;

    private readonly _initializing: boolean = true;

    constructor(protected _taskService: TaskResourceService, private _userService: UserService,
                private _snackBarService: SnackBarService, private _translate: TranslateService,
                private _Language: LanguageService, protected _searchService: SearchService) { // need for translations
        super();
        this.taskArray = [];
        this.taskData = new Subject<Array<TaskPanelData>>();
        this.loading = new BehaviorSubject<boolean>(false);
        this.changedFields = new Subject<ChangedFields>();

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
    }

    public loadTasks() {
        if (this.loading.getValue() || this._initializing) {
            return;
        }
        this.loading.next(true);

        // TODO 12.5.2020 - better solution for mongo searching
        if (!this._searchService.additionalFiltersApplied && !!this._parentCaseId) {
            this._taskService.getTasks({case: this._parentCaseId}).subscribe(tasks => this.processTasks(tasks),
                error => this.processError());
        } else {
            // TODO 7.4.2020 - task sorting is currently not supported, see case view for implementation
            this._taskService.searchTask(this._searchService.activeFilter).subscribe(tasks => this.processTasks(tasks),
                error => this.processError());
        }
    }

    private processTasks(tasks: Array<Task>): void {
        if (tasks instanceof Array) {
            if (this.taskArray.length) {
                tasks = this.resolveUpdate(tasks);
            }
            tasks.forEach(task => {
                this.taskArray.push({
                    task,
                    changedFields: this.changedFields
                });
            });
        } else {
            this.taskArray.splice(0, this.taskArray.length);
            this._snackBarService.openWarningSnackBar(this._translate.instant('tasks.snackbar.noTasksFound'));
        }
        this.loading.next(false);
        this.taskData.next(this.taskArray);
    }

    private processError(): void {
        this._snackBarService.openErrorSnackBar(
            this._translate.instant('tasks.snackbar.failedToLoad')
        );
        this.loading.next(false);
    }

    private resolveUpdate(tasks) {
        const tasksToDelete = []; // saved are only indexes for work later
        this.taskArray.forEach((item, i) => {
            const index = tasks.findIndex(r => r.caseId === item.task.caseId && r.transitionId === item.task.transitionId);
            if (index === -1)
                tasksToDelete.push(i);
            else {
                Object.keys(this.taskArray[i].task).forEach(key => {
                    if (tasks[index][key] !== undefined) {
                        this.taskArray[i].task[key] = tasks[index][key];
                    }
                });
                this.blockFields(!(this.taskArray[i].task.user && this.taskArray[i].task.user.email === this._userService.user.email), i);
                this.taskArray[i].changedFields = this.changedFields;
                tasks.splice(index, 1);
            }
        });
        tasksToDelete.sort((a, b) => b - a);
        tasksToDelete.forEach(index => {
            this.taskArray.splice(index, 1);
        });
        return tasks;
    }

    private blockFields(bool: boolean, index: number) {
        if (this.taskArray[index].task.dataGroups) {
            this.taskArray[index].task.dataGroups.forEach(group => {
                group.fields.forEach(field => {
                    field.block = bool;
                });
            });
        }
    }

    public reload(): void {
        this.loadTasks();
    }

    protected getMetaFieldSortId(): string {
        // TODO Tasks were not sortable on old frontend sorting might require elastic mapping changes on backend
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        return 'priority,desc';
    }
}
