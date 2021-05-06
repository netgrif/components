import {Inject, Injectable, Optional} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
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
import {AssingTaskEventOutcome} from '../../resources/event-outcomes/task-outcomes/assing-task-event-outcome';


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
    public assign(afterAction = new Subject<boolean>()): void {
        const assignedTaskId = this._safeTask.stringId;

        if (this._taskState.isLoading(assignedTaskId)) {
            return;
        }
        if (this._safeTask.user) {
            this.completeSuccess(afterAction);
            return;
        }

        const sub = new ReplaySubject<boolean>();
        if (this._taskViewService !== null && !this._taskViewService.allowMultiOpen) {
            if (!this._taskViewService.isEmptyQueue()) {
                this._taskViewService.popQueue().subscribe(() => {
                    this._taskState.startLoading(assignedTaskId);
                    this.assignRequest(afterAction, assignedTaskId, sub, true);
                });
                this._taskViewService.addToQueue(sub);
                return;
            }
            this._taskViewService.addToQueue(sub);
        }
        this._taskState.startLoading(assignedTaskId);
        this.assignRequest(afterAction, assignedTaskId, sub);
    }

    protected assignRequest(afterAction = new Subject<boolean>(), assignedTaskId: string,
                            queueAction = new Subject<boolean>(), fromQueue = false) {
        this._taskResourceService.assignTask(this._safeTask.stringId).pipe(take(1)).subscribe((eventOutcome: AssingTaskEventOutcome) => {
            this._taskState.stopLoading(assignedTaskId);
            if (!this.isTaskRelevant(assignedTaskId)) {
                this._log.debug('current task changed before the assign response could be received, discarding...');
                return;
            }

            if (eventOutcome.success) {
                this._taskContentService.updateStateData(eventOutcome);
                this._taskDataService.emitChangedFields(eventOutcome.data.changedFields);
                fromQueue ? this._taskOperations.forceReload() : this._taskOperations.reload();
                this.completeActions(afterAction, queueAction, true);
            } else if (eventOutcome.error) {
                this._snackBar.openErrorSnackBar(eventOutcome.error);
                this.completeActions(afterAction, queueAction, false);
            }
        }, error => {
            this._taskState.stopLoading(assignedTaskId);
            this._log.debug('assigning task failed', error);

            if (!this.isTaskRelevant(assignedTaskId)) {
                this._log.debug('current task changed before the assign error could be received');
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
             ${this._taskContentService.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.completeActions(afterAction, queueAction, false);
        });
    }

    /**
     * @ignore
     * Reloads the task and emits `true` to the `afterAction` stream
     */
    protected completeSuccess(afterAction: Subject<boolean>): void {
        this._taskOperations.reload();
        this.sendNotification(true);
        afterAction.next(true);
        afterAction.complete();
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
     * Publishes an assign notification to the {@link TaskEventService}
     * @param success whether the assign operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.ASSIGN, success));
    }
}
