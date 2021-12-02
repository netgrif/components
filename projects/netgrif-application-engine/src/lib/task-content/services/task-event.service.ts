import {Injectable, OnDestroy} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AssignPolicy} from '../model/policy';
import {TaskContentService} from './task-content.service';
import {TaskHandlingService} from '../../task/services/task-handling-service';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {Observable, Subject} from 'rxjs';
import {TaskEventNotification} from '../model/task-event-notification';
import {PermissionService} from '../../authorization/permission/permission.service';

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
                protected permissionService: PermissionService,
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
}
