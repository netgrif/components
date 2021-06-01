import {Inject, Injectable, Optional} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
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
import {take} from 'rxjs/operators';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {CancelTaskEventOutcome} from '../../resources/event-outcomes/task-outcomes/cancel-task-event-outcome';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';

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
                @Optional() protected _taskViewService: TaskViewService,
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
            afterAction.complete();
            return;
        }

        const sub = new ReplaySubject<boolean>();
        if (this._taskViewService !== null && !this._taskViewService.allowMultiOpen) {
            if (!this._taskViewService.isEmptyQueue()) {
                this._taskViewService.popQueue().subscribe(() => {
                    this._taskState.startLoading(canceledTaskId);
                    this.cancelRequest(afterAction, canceledTaskId, sub, true);
                });
                this._taskViewService.addToQueue(sub);
                return;
            }
            this._taskViewService.addToQueue(sub);
        }

        this._taskState.startLoading(canceledTaskId);
        this.cancelRequest(afterAction, canceledTaskId, sub);
    }

    protected cancelRequest(afterAction = new Subject<boolean>(), canceledTaskId: string,
                            queueAction = new Subject<boolean>(), fromQueue = false) {
        this._taskResourceService.cancelTask(this._safeTask.stringId).pipe(take(1))
            .subscribe((outcomeResource: EventOutcomeMessageResource) => {
            this._taskState.stopLoading(canceledTaskId);
            if (!this.isTaskRelevant(canceledTaskId)) {
                this._log.debug('current task changed before the cancel response could be received, discarding...');
                return;
            }

            if (outcomeResource.success) {
                this._taskContentService.updateStateData(outcomeResource.outcome as CancelTaskEventOutcome);
                this._taskDataService.emitChangedFields((outcomeResource.outcome as CancelTaskEventOutcome).data.changedFields );
                fromQueue ? this._taskOperations.forceReload() : this._taskOperations.reload();
                this.completeActions(afterAction, queueAction, true);
            } else if (outcomeResource.error !== undefined) {
                if (outcomeResource.error !== '') {
                    this._snackBar.openErrorSnackBar(outcomeResource.error);
                }
                this._taskDataService.emitChangedFields(outcomeResource.changedFields.changedFields);
                this.completeActions(afterAction, queueAction, false);
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
            this.completeActions(afterAction, queueAction, false);
        });
    }

    /**
     * @ignore
     * complete all action streams and send notification with selected boolean
     */
    protected completeActions(afterAction: Subject<boolean>, queueAction: Subject<boolean>, bool: boolean): void {
        this.sendNotification(bool);
        afterAction.next(bool);
        afterAction.complete();
        queueAction.next(bool);
        queueAction.complete();
    }

    /**
     * Publishes a cancel notification to the {@link TaskEventService}
     * @param success whether the cancel operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.CANCEL, success));
    }
}
