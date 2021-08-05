import {Inject, Injectable, Optional} from '@angular/core';
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
import {EventQueueService} from '../../event-queue/services/event-queue.service';
import {QueuedEvent} from '../../event-queue/model/queued-event';
import {AfterAction} from '../../utility/call-chain/after-action';

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
                protected _eventQueue: EventQueueService,
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
    public cancel(afterAction: AfterAction = new AfterAction()) {
        this._eventQueue.scheduleEvent(new QueuedEvent(
            () => this.canCancel(),
            nextEvent => {
                this.performCancelRequest(afterAction, nextEvent, this._taskViewService !== null && !this._taskViewService.allowMultiOpen);
            },
            nextEvent => {
                this.completeActions(afterAction, nextEvent, false);
            }
        ));
    }

    /**
     * Performs a `cancel` request on the task currently stored in the `taskContent` service
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param forceReload whether a force reload of the task data should be performed after cancel.
     * If set to `false` a regular reload is performed instead.
     */
    protected performCancelRequest(afterAction: AfterAction, nextEvent: AfterAction, forceReload: boolean) {
        const canceledTaskId = this._safeTask.stringId;

        // this is probably no longer necessary because of the event queue
        if (this._taskState.isLoading(canceledTaskId)) {
            nextEvent.resolve(true);
            return;
        }

        this._taskState.startLoading(canceledTaskId);
        this.cancelRequest(afterAction, canceledTaskId, nextEvent, forceReload);
    }

    /**
     * Calls the endpoint and processes the possible responses.
     * @param afterAction the action that should be performed after the request is processed
     * @param canceledTaskId the id of the task that is being canceled
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param forceReload whether a force reload of the task data should be performed after cancel.
     * If set to `false` a regular reload is performed instead.
     */
    protected cancelRequest(afterAction: AfterAction = new AfterAction(),
                            canceledTaskId: string,
                            nextEvent: AfterAction = new AfterAction(),
                            forceReload: boolean) {
        this._taskResourceService.cancelTask(this._safeTask.stringId).pipe(take(1)).subscribe((outcomeResource: EventOutcomeMessageResource) => {
            this._taskState.stopLoading(canceledTaskId);
            if (!this.isTaskRelevant(canceledTaskId)) {
                this._log.debug('current task changed before the cancel response could be received, discarding...');
                nextEvent.resolve(false);
                return;
            }

            if (outcomeResource.success) {
                this._taskContentService.updateStateData(outcomeResource.outcome as CancelTaskEventOutcome);
                this._taskDataService.emitChangedFields((outcomeResource.outcome as CancelTaskEventOutcome).data.changedFields);
                forceReload ? this._taskOperations.forceReload() : this._taskOperations.reload();
                this.completeActions(afterAction, nextEvent, true);
            } else if (outcomeResource.error !== undefined) {
                if (outcomeResource.error !== '') {
                    this._snackBar.openErrorSnackBar(outcomeResource.error);
                }
                this._taskDataService.emitChangedFields(outcomeResource.changedFields.changedFields);
                this.completeActions(afterAction, nextEvent, false);
            }
        }, error => {
            this._taskState.stopLoading(canceledTaskId);
            this._log.debug('canceling task failed', error);

            if (!this.isTaskRelevant(canceledTaskId)) {
                this._log.debug('current task changed before the cancel error could be received');
                nextEvent.resolve(false);
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.cancelTask')}
             ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.completeActions(afterAction, nextEvent, false);
        });
    }

    /**
     * Determines whether the cancel operation can be performed.
     */
    protected canCancel(): boolean {
        return !!this._safeTask.user
                && (
                    this._userComparator.compareUsers(this._safeTask.user)
                    || this._taskEventService.canDo('perform')
                );
    }

    /**
     * complete all action streams and send notification with selected boolean
     */
    protected completeActions(afterAction: AfterAction, nextEvent: AfterAction, bool: boolean): void {
        this.sendNotification(bool);
        afterAction.resolve(bool);
        nextEvent.resolve(bool);
    }

    /**
     * Publishes a cancel notification to the {@link TaskEventService}
     * @param success whether the cancel operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.CANCEL, success));
    }
}
