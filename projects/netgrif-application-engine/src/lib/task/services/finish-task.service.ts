import {Inject, Injectable, Optional} from '@angular/core';
import {take} from 'rxjs/operators';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskDataService} from './task-data.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {SelectedCaseService} from './selected-case.service';
import {createTaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {EventQueueService} from '../../event-queue/services/event-queue.service';
import {QueuedEvent} from '../../event-queue/model/queued-event';
import {AfterAction} from '../../utility/call-chain/after-action';


/**
 * Service that handles the logic of finishing a task.
 */
@Injectable()
export class FinishTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService,
                protected _taskState: TaskRequestStateService,
                protected _taskDataService: TaskDataService,
                protected _callChain: CallChainService,
                protected _taskEvent: TaskEventService,
                protected _eventQueue: EventQueueService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService) {
        super(_taskContentService, _selectedCaseService);
    }

    /**
     * Updates the task data to their current state from backend, checks the validity of the data and
     * sends a finish request to backend.
     *
     * Finish request is not sent if the task contains invalid data.
     *
     * If an update to the data is already in progress waits for it's successful completion and sends the finish request after.
     *
     * @param afterAction if finish request completes successfully `true` will be emitted into this Subject,
     * otherwise `false` will be emitted
     */
    public validateDataAndFinish(afterAction: AfterAction = new AfterAction()): void {
        if (this._safeTask.dataSize <= 0) {
            this._taskDataService.initializeTaskDataFields(this._callChain.create(() => {
                if (this._safeTask.dataSize <= 0 ||
                    (this._taskContentService.validateDynamicEnumField() && this._taskContentService.validateTaskData())) {
                    this.queueFinishTaskRequest(afterAction);
                }
            }));
        } else if (this._taskContentService.validateDynamicEnumField() && this._taskContentService.validateTaskData()) {
            const finishedTaskId = this._safeTask.stringId;
            this._taskDataService.updateTaskDataFields(this._callChain.create(success => {
                if (success) {
                    if (this._taskState.isUpdating(finishedTaskId)) {
                        this._taskDataService.updateSuccess$.pipe(take(1)).subscribe(bool => {
                            if (bool) {
                                this.queueFinishTaskRequest(afterAction);
                            }
                        });
                    } else {
                        this.queueFinishTaskRequest(afterAction);
                    }
                }
            }));
        }
    }

    /**
     * Sends the finish request to backend and notifies the user about the outcome of the operation via a snack bar message.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the finish request.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     * @param afterAction if finish request completes successfully `true` will be emitted into this Subject,
     * otherwise `false` will be emitted
     */
    protected queueFinishTaskRequest(afterAction: AfterAction): void {
        this._eventQueue.scheduleEvent(new QueuedEvent(
            () => true,
            nextEvent => {
                this.performFinishRequest(afterAction, nextEvent);
            }
        ));
    }

    /**
     * Performs a `finish` request on the task currently stored in the `taskContent` service
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected performFinishRequest(afterAction: AfterAction, nextEvent: AfterAction) {
        const finishedTaskId = this._safeTask.stringId;

        // this is probably no longer necessary because of the event queue
        if (this._taskState.isLoading(finishedTaskId)) {
            nextEvent.resolve(true);
            return;
        }

        this._taskState.startLoading(finishedTaskId);

        this._taskResourceService.finishTask(this._safeTask.stringId).pipe(take(1)).subscribe(eventOutcome => {
            this._taskState.stopLoading(finishedTaskId);
            if (!this.isTaskRelevant(finishedTaskId)) {
                this._log.debug('current task changed before the finish response could be received, discarding...');
                nextEvent.resolve(false);
                return;
            }

            if (eventOutcome.success) {
                this._taskContentService.updateStateData(eventOutcome);
                this._taskDataService.emitChangedFields(eventOutcome.changedFields);
                this._taskOperations.reload();
                this.completeActions(afterAction, nextEvent, true);
                this._taskOperations.close();
            } else if (eventOutcome.error !== undefined) {
                if (eventOutcome.error !== '') {
                    this._snackBar.openErrorSnackBar(eventOutcome.error);
                }
                this._taskDataService.emitChangedFields(eventOutcome.changedFields);
                this.completeActions(afterAction, nextEvent, false);
            }
        }, error => {
            this._taskState.stopLoading(finishedTaskId);
            this._log.debug('finishing task failed', error);

            if (!this.isTaskRelevant(finishedTaskId)) {
                this._log.debug('current task changed before the finish error could be received');
                nextEvent.resolve(false);
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.finishTask')}
             ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.completeActions(afterAction, nextEvent, false);
        });
    }

    /**
     * Completes all the action streams and sends the notification, with the provided result
     */
    protected completeActions(afterAction: AfterAction, nextEvent: AfterAction, result: boolean) {
        this.sendNotification(result);
        afterAction.resolve(result);
        nextEvent.resolve(result);
    }

    /**
     * Publishes a finish notification to the {@link TaskEventService}
     * @param success whether the finish operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.FINISH, success));
    }
}
