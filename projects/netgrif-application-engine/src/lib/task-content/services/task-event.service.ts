import {Injectable} from '@angular/core';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {UserService} from '../../user/services/user.service';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {AssignPolicy} from '../../panel/task-panel/policy';
import {TaskPanelContentService} from '../../panel/task-panel/task-panel-content/task-panel-content.service';

@Injectable()
export class TaskEventService {

    protected _task: Task;
    protected _initialized = false;

    constructor(protected _taskViewService: TaskViewService,
                protected _userService: UserService,
                protected _taskContentService: TaskPanelContentService,
                protected _logger: LoggerService) {
        this._taskContentService.task$.subscribe(task => {
            this._task = task;
            this._initialized = true;
        });
    }

    /**
     * Checks whether the logged user can assign the task, managed by this service, at it's current state.
     */
    public canAssign(): boolean {
        this.checkInitialized();
        return this._task.assignPolicy === AssignPolicy.manual
            && !this._task.user
            && this.canDo('perform');
    }

    /**
     * Checks whether the logged user can delegate the task, managed by this service, at it's current state.
     */
    public canReassign(): boolean {
        this.checkInitialized();
        return this._task.user
            && this._task.user.email === this._userService.user.email
            && this.canDo('delegate');
    }

    /**
     * Checks whether the logged user can cancel the task, managed by this service, at it's current state,
     */
    public canCancel(): boolean {
        this.checkInitialized();
        return (
                this._task.assignPolicy === AssignPolicy.manual
                && this._task.user
                && this._task.user.email === this._userService.user.email
            ) || (
                this._task.user
                && this.canDo('cancel')
            );
    }

    /**
     * Checks whether the logged user can finish the task, managed by this service, at it's current state,
     */
    public canFinish(): boolean {
        this.checkInitialized();
        return this._task.user
            && this._task.user.email === this._userService.user.email;
    }

    /**
     * Checks whether the logged user can collapse the task, managed by this service, at it's current state,
     */
    public canCollapse(): boolean {
        this.checkInitialized();
        return this._task.assignPolicy === AssignPolicy.manual;
    }

    /**
     * Checks whether the logged user has necessary role to perform the given action on the task managed by this service
     * @param action the action that is checked
     */
    public canDo(action): boolean {
        this.checkInitialized();
        if (!this._task.roles || !action || !(this._task.roles instanceof Object)) {
            return false;
        }
        return Object.keys(this._task.roles).some(role =>
            this._userService.hasRoleById(role) ? !!this._task.roles[role][action] : false
        );
    }

    /**
     * Does nothing if the injected observable was resolved. Otherwise throws an error.
     */
    protected checkInitialized(): void {
        if (this._initialized) {
            return;
        }
        this._logger.debug('Some method of TaskEventService was called before the injected Observable resolved');
        throw new Error('TaskEventService is not yet initialized and it\'s methods cannot be called');
    }
}
