import {Injectable, OnDestroy} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AssignPolicy} from '../model/policy';
import {TaskContentService} from './task-content.service';
import {TaskHandlingService} from '../../task/services/task-handling-service';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {Observable, Subject} from 'rxjs';
import {TaskEventNotification} from '../model/task-event-notification';

/**
 * Holds logic about the available operations on a {@link Task} object based on it's state.
 *
 * Beware that it gets the Task from (@link TaskContentService) instance and thus the task might not be always initialized.
 * If the task is not initialized this class cannot work properly.
 */
@Injectable()
export class TaskEventService extends TaskHandlingService implements OnDestroy {

    protected _taskEventNotifications$: Subject<TaskEventNotification>;

    constructor(protected _userService: UserService,
                protected _logger: LoggerService,
                protected _userComparator: UserComparatorService,
                _taskContentService: TaskContentService) {
        super(_taskContentService);
        this._taskEventNotifications$ = new Subject<TaskEventNotification>();
    }

    /**
     * Completes the stream
     */
    ngOnDestroy(): void {
        this._taskEventNotifications$.complete();
    }

    /**
     * Provides information about results of events executed on the managed {@link Task}
     */
    public get taskEventNotifications$(): Observable<TaskEventNotification> {
        return this._taskEventNotifications$.asObservable();
    }

    /**
     * Emits a new {@link TaskEventNotification} into the notifications stream
     * @param event the event information that will be pushed into the stream
     */
    public publishTaskEvent(event: TaskEventNotification): void {
        this._taskEventNotifications$.next(event);
    }

    /**
     * Checks whether the logged user can assign the task, managed by this service, in it's current state.
     */
    public canAssign(): boolean {
        return !!this._task
            && (
                (
                    this._task.assignPolicy === AssignPolicy.manual
                    && !this._task.user
                    && this.canDo('perform')
                )
                || (
                    this._task.roles === null
                    || this._task.roles === undefined
                    || Object.keys(this._task.roles).length === 0
                )
            );
    }

    /**
     * Checks whether the logged user can delegate the task, managed by this service, in it's current state.
     */
    public canReassign(): boolean {
        return !!this._task
            && !!this._task.user
            && this._userComparator.compareUsers(this._task.user)
            && this.canDo('delegate')
            && ((this._task.assignedUserPolicy === undefined || this._task.assignedUserPolicy.reassign === undefined)
            || this._task.assignedUserPolicy.reassign);
    }

    /**
     * Checks whether the logged user can cancel the task, managed by this service, in it's current state,
     */
    public canCancel(): boolean {
        return !!this._task
            && (
                (
                    !!this._task.user
                    && this._userComparator.compareUsers(this._task.user)
                    && ((this._task.assignedUserPolicy === undefined || this._task.assignedUserPolicy.cancel === undefined)
                        || this._task.assignedUserPolicy.cancel)
                ) || (
                    !!this._task.user
                    && this.canDo('cancel')
                ) && (
                    this._task.user.id === this._userService.user.id
                )
            );
    }

    /**
     * Checks whether the logged user can finish the task, managed by this service, in it's current state,
     */
    public canFinish(): boolean {
        return !!this._task
            && !!this._task.user
            && this._userComparator.compareUsers(this._task.user);
    }

    /**
     * Checks whether the logged user can collapse the task, managed by this service, in it's current state,
     */
    public canCollapse(): boolean {
        return !!this._task
            && this._task.assignPolicy === AssignPolicy.manual;
    }

    /**
     * Checks whether the logged user has necessary role to perform the given action on the task managed by this service
     * @param action the action that is checked
     */
    public canDo(action): boolean {
        if (!this._task
            || !this._task.roles
            || !action
            || !(this._task.roles instanceof Object)
        ) {
            return false;
        }

        const result = Object.keys(this._task.users).some(user =>
            !!this._task.users ? !!this._task.users[user][action] : true
        );

        return result || Object.keys(this._task.roles).some(role =>
            this._userService.hasRoleById(role) ? !!this._task.roles[role][action] : false
        );
    }
}
