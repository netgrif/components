import {Inject, Injectable, Optional} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {SelectedCaseService} from './selected-case.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {createTaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {TaskDataService} from './task-data.service';
import {take} from 'rxjs/operators';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {EventQueueService} from '../../event-queue/services/event-queue.service';
import {QueuedEvent} from '../../event-queue/model/queued-event';
import {AfterAction} from '../../utility/call-chain/after-action';
import {AssignTaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/assign-task-event-outcome';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {ChangedFieldsMap, EventService} from '../../event/services/event.service';


/**
 * Service that handles the logic of assigning a task.
 */
@Injectable()
export class AssignTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService,
                protected _taskState: TaskRequestStateService,
                protected _taskEvent: TaskEventService,
                protected _taskDataService: TaskDataService,
                protected _eventQueue: EventQueueService,
                protected _eventService: EventService,
                protected _changedFieldsService: ChangedFieldsService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                @Optional() protected _taskViewService: TaskViewService,
                _taskContentService: TaskContentService) {
        super(_taskContentService, _selectedCaseService);
    }

    /**
     * Performs the 'assign' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the assign operation.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     * @param afterAction if assign completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    public assign(afterAction: AfterAction = new AfterAction()): void {
        this._eventQueue.scheduleEvent(new QueuedEvent(
            () => {
                return !this._safeTask.user;
            },
            nextEvent => {
                this.performAssignRequest(afterAction, nextEvent, this._taskViewService !== null && !this._taskViewService.allowMultiOpen);
            },
            nextEvent => {
                this.completeSuccess(afterAction, nextEvent);
            }
        ));
    }

    /**
     * Performs an `assign` request on the task currently stored in the `taskContent` service
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param forceReload whether a force reload of the task data should be performed after assign.
     * If set to `false` a regular reload is performed instead.
     */
    protected performAssignRequest(afterAction: AfterAction, nextEvent: AfterAction, forceReload: boolean) {
        const assignedTaskId = this._safeTask.stringId;

        // this is probably no longer necessary because of the event queue
        if (this._taskState.isLoading(assignedTaskId)) {
            nextEvent.resolve(true);
            return;
        }

        this._taskState.startLoading(assignedTaskId);
        this.assignRequest(afterAction, assignedTaskId, nextEvent, forceReload);
    }

    /**
     * Calls the endpoint and processes the possible responses.
     * @param afterAction the action that should be performed after the request is processed
     * @param assignedTaskId the id of the task that is being assigned
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param forceReload whether a force reload of the task data should be performed after assign.
     * If set to `false` a regular reload is performed instead.
     */
    protected assignRequest(afterAction: AfterAction = new AfterAction(),
                            assignedTaskId: string,
                            nextEvent: AfterAction = new AfterAction(),
                            forceReload: boolean) {
        this._taskResourceService.assignTask(this._safeTask.stringId).pipe(take(1))
            .subscribe((outcomeResource: EventOutcomeMessageResource) => {
                this._taskState.stopLoading(assignedTaskId);
                if (!this.isTaskRelevant(assignedTaskId)) {
                    this._log.debug('current task changed before the assign response could be received, discarding...');
                    nextEvent.resolve(false);
                    return;
                }

                if (outcomeResource.success) {
                    this._taskContentService.updateStateData(outcomeResource.outcome as AssignTaskEventOutcome);
                    const changedFieldsMap: ChangedFieldsMap = this._eventService
                        .parseChangedFieldsFromOutcomeTree(outcomeResource.outcome);
                    if (!!changedFieldsMap) {
                        this._changedFieldsService.emitChangedFields(changedFieldsMap);
                    }
                    forceReload ? this._taskOperations.forceReload() : this._taskOperations.reload();
                    this.completeActions(afterAction, nextEvent, true);
                    // this._snackBar.openSuccessSnackBar(outcomeResource.outcome.message === undefined
                    //     ? this._translate.instant('tasks.snackbar.assignTaskSuccess')
                    //     : outcomeResource.outcome.message);
                } else if (outcomeResource.error) {
                    this._snackBar.openErrorSnackBar(outcomeResource.error);
                    this.completeActions(afterAction, nextEvent, false);
                }
            }, error => {
                this._taskState.stopLoading(assignedTaskId);
                this._log.debug('assigning task failed', error);

                if (!this.isTaskRelevant(assignedTaskId)) {
                    this._log.debug('current task changed before the assign error could be received');
                    nextEvent.resolve(false);
                    return;
                }

                this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
             ${this._taskContentService.task} ${this._translate.instant('tasks.snackbar.failed')}`);
                this.completeActions(afterAction, nextEvent, false);
            });
    }

    /**
     * Reloads the task and emits `true` to the `afterAction` stream
     */
    protected completeSuccess(afterAction: AfterAction, nextEvent: AfterAction): void {
        this._taskOperations.reload();
        this.completeActions(afterAction, nextEvent, true);
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
     * Publishes an assign notification to the {@link TaskEventService}
     * @param success whether the assign operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.ASSIGN, success));
    }
}
