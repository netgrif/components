import {Inject, Injectable, Optional} from '@angular/core';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {LoggerService} from '../../logger/services/logger.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {UserListInjectedData} from '../../side-menu/content-components/user-assign/model/user-list-injected-data';
import {UserValue} from '../../data-fields/user-field/models/user-value';
import {SelectedCaseService} from './selected-case.service';
import {NAE_USER_ASSIGN_COMPONENT} from '../../side-menu/content-components/injection-tokens';
import {createTaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {TaskDataService} from './task-data.service';
import {take} from 'rxjs/operators';
import {DelegateTaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/delegate-task-event-outcome';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {EventQueueService} from '../../event-queue/services/event-queue.service';
import {QueuedEvent} from '../../event-queue/model/queued-event';
import {AfterAction} from '../../utility/call-chain/after-action';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {EventService} from '../../event/services/event.service';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';


/**
 * Service that handles the logic of delegating a task.
 */
@Injectable()
export class DelegateTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _sideMenuService: SideMenuService,
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
                @Optional() @Inject(NAE_USER_ASSIGN_COMPONENT) protected _userAssignComponent: any,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService) {
        super(_taskContentService, _selectedCaseService);
    }

    /**
     * Performs the 'delegate' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the delegate operation.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     * @param afterAction if delegate completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    public delegate(afterAction: AfterAction = new AfterAction()) {
        const delegatedTaskId = this._safeTask.stringId;

        if (this._taskState.isLoading(delegatedTaskId)) {
            return;
        }
        this._sideMenuService.open(this._userAssignComponent, SideMenuSize.MEDIUM,
            {
                roles: Object.keys(this._safeTask.roles).filter(role =>
                    this._safeTask.roles[role]['assigned'] !== undefined && this._safeTask.roles[role]['assigned']),
                value: !this._safeTask.user ? undefined : new UserValue(
                    this._safeTask.user.id, this._safeTask.user.name, this._safeTask.user.surname, this._safeTask.user.email
                ),
                negativeRoles: Object.keys(this._safeTask.roles).filter(role =>
                    this._safeTask.roles[role]['assigned'] !== undefined && !this._safeTask.roles[role]['assigned'])
            } as UserListInjectedData).onClose.subscribe(event => {

            this._log.debug('Delegate sidemenu event:' + event);
            if (event.data === undefined) {
                return;
            }

            this._eventQueue.scheduleEvent(new QueuedEvent(
                () => {
                    const result = this.isTaskRelevant(delegatedTaskId);
                    if (!result) {
                        this._log.debug('current task changed before the delegate side menu data was received, discarding...');
                    }
                    return result;
                },
                nextEvent => {
                    this.performDelegateRequest(afterAction, delegatedTaskId, event.data.id, nextEvent);
                }
            ));
        });
    }

    /**
     * Performs a `delegate` request on the task currently stored in the `taskContent` service
     * @param afterAction the action that should be performed after the request is processed
     * @param delegatedTaskId id of the task that is being delegated
     * @param delegatedUserId id of the user whom the task is being delegated
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected performDelegateRequest(afterAction: AfterAction, delegatedTaskId: string, delegatedUserId: any, nextEvent: AfterAction) {
        this._taskState.startLoading(delegatedTaskId);
        this._taskResourceService.delegateTask(this._safeTask.stringId, delegatedUserId).pipe(take(1)).subscribe(
            (outcomeResource: EventOutcomeMessageResource) => {
            this._taskState.stopLoading(delegatedTaskId);
            if (!this.isTaskRelevant(delegatedTaskId)) {
                this._log.debug('current task changed before the delegate response could be received, discarding...');
                nextEvent.resolve(false);
                return;
            }

            if (outcomeResource.success) {
                this._taskContentService.updateStateData(outcomeResource.outcome as DelegateTaskEventOutcome);
                const changedFieldsMap: ChangedFieldsMap = this._eventService
                    .parseChangedFieldsFromOutcomeTree(outcomeResource.outcome);
                if (!!changedFieldsMap) {
                    this._changedFieldsService.emitChangedFields(changedFieldsMap);
                }
                this.completeSuccess(afterAction, nextEvent);
            } else if (outcomeResource.error) {
                this._snackBar.openErrorSnackBar(outcomeResource.error);
                this.completeActions(afterAction, nextEvent, false);
            }
        }, error => {
            this._taskState.stopLoading(delegatedTaskId);
            this._log.debug('getting task data failed', error);

            if (!this.isTaskRelevant(delegatedTaskId)) {
                this._log.debug('current task changed before the delegate error could be received');
                nextEvent.resolve(false);
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
                     ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
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
     * Completes all the action streams and sends the notification, with the provided result
     */
    protected completeActions(afterAction: AfterAction, nextEvent: AfterAction, result: boolean) {
        this.sendNotification(result);
        afterAction.resolve(result);
        nextEvent.resolve(result);
    }

    /**
     * Publishes a delegate notification to the {@link TaskEventService}
     * @param success whether the delegate operation was successful or not
     */
    protected sendNotification(success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, TaskEvent.DELEGATE, success));
    }
}
