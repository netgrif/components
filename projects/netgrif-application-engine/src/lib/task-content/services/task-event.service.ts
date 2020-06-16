import {Injectable} from '@angular/core';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {UserService} from '../../user/services/user.service';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {AssignPolicy} from '../model/policy';
import {TaskContentService} from './task-content.service';

/**
 * Holds logic about the available operations on a {@link Task} object based on it's state.
 *
 * Beware that it get's the Task from (@link TaskContentService) instance and thus the task might not be always initialized.
 * If the task is not initialized this class cannot work properly.
 */
@Injectable()
export class TaskEventService {

    constructor(protected _taskViewService: TaskViewService,
                protected _userService: UserService,
                protected _taskContentService: TaskContentService,
                protected _logger: LoggerService) {
    }

    /**
     * @ignore
     * Performs a check and returns the Task from the injected {@link TaskContentService} instance
     */
    private get _task(): Task {
        const task = this._taskContentService.task;
        if (!task) {
            throw new Error('TaskEventService cannot work without an initialized TaskContentService');
        }
        return task;
    }

    /**
     * Checks whether the logged user can assign the task, managed by this service, at it's current state.
     */
    public canAssign(): boolean {
        return this._task.assignPolicy === AssignPolicy.manual
            && !this._task.user
            && this.canDo('perform');
    }

    /**
     * Checks whether the logged user can delegate the task, managed by this service, at it's current state.
     */
    public canReassign(): boolean {
        return this._task.user
            && this._task.user.email === this._userService.user.email
            && this.canDo('delegate');
    }

    /**
     * Checks whether the logged user can cancel the task, managed by this service, at it's current state,
     */
    public canCancel(): boolean {
        return (
                this._task.user
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
        return this._task.user
            && this._task.user.email === this._userService.user.email;
    }

    /**
     * Checks whether the logged user can collapse the task, managed by this service, at it's current state,
     */
    public canCollapse(): boolean {
        return this._task.assignPolicy === AssignPolicy.manual;
    }

    /**
     * Checks whether the logged user has necessary role to perform the given action on the task managed by this service
     * @param action the action that is checked
     */
    public canDo(action): boolean {
        if (!this._task.roles || !action || !(this._task.roles instanceof Object)) {
            return false;
        }
        return Object.keys(this._task.roles).some(role =>
            this._userService.hasRoleById(role) ? !!this._task.roles[role][action] : false
        );
    }
}
