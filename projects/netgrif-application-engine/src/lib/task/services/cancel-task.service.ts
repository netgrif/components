import {Inject, Injectable, Optional} from '@angular/core';
import {Subject} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {SelectedCaseService} from './selected-case.service';
import {createTaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {TaskDataService} from './task-data.service';

/**
 * Service that handles the logic of canceling a task.
 */
@Injectable()
export class CancelTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _taskEventService: TaskEventService,
                protected _taskResourceService: TaskResourceService,
                protected _translate: TranslateService,
                protected _snackBar: SnackBarService,
                protected _taskState: TaskRequestStateService,
                protected _userComparator: UserComparatorService,
                protected _taskEvent: TaskEventService,
                protected _taskDataService: TaskDataService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService) {
        super(_taskContentService, _selectedCaseService);
    }

    /**
     * Performs the 'cancel' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the cancel operation.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     * @param afterAction if cancel completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    cancel(afterAction = new Subject<boolean>()) {
        const canceledTaskId = this._safeTask.stringId;

        if (this._taskState.isLoading(canceledTaskId)) {
            return;
        }
        if (!this._safeTask.user
            || (
                !this._userComparator.compareUsers(this._safeTask.user)
                && !this._taskEventService.canDo('perform')
            )) {
            this.sendNotification(false);
            afterAction.next(false);
            return;
        }
        this._taskState.startLoading(canceledTaskId);

        this._taskResourceService.cancelTask(this._safeTask.stringId).subscribe(eventOutcome => {
            this._taskState.stopLoading(canceledTaskId);

            if (!this.isTaskRelevant(canceledTaskId)) {
                this._log.debug('current task changed before the cancel response could be received, discarding...');
                return;
            }

            if (eventOutcome.success) {
                this._taskContentService.updateStateData(eventOutcome);
                this._taskDataService.emitChangedFields(eventOutcome.changedFields);
                this._taskOperations.reload();
                this.sendNotification(true);
                afterAction.next(true);
            } else if (eventOutcome.error !== undefined) {
                if (eventOutcome.error !== '') {
                    this._snackBar.openErrorSnackBar(eventOutcome.error);
                }
                this._taskDataService.emitChangedFields(eventOutcome.changedFields);
                this.sendNotification(false);
                afterAction.next(false);
            }
        }, error => {
            this._taskState.stopLoading(canceledTaskId);
            this._log.debug('canceling task failed', error);

            if (!this.isTaskRelevant(canceledTaskId)) {
                this._log.debug('current task changed before the cancel error could be received');
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.cancelTask')}
             ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.sendNotification(false);
            afterAction.next(false);
        });
    }

    /**
     * Publishes a cancel notification to the {@link TaskEventService}
     * @param success whether the cancel operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.CANCEL, success));
    }
}
