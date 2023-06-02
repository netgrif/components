import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskRequestStateService} from './task-request-state.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {FieldConverterService} from '../../task-content/services/field-converter.service';
import {TaskSetDataRequestBody} from '../../resources/interface/task-set-data-request-body';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {HttpErrorResponse} from '@angular/common/http';
import {FileField} from '../../data-fields/file-field/models/file-field';
import {SelectedCaseService} from './selected-case.service';
import {FileListField} from '../../data-fields/file-list-field/models/file-list-field';
import {createTaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {take} from 'rxjs/operators';
import {DynamicEnumerationField} from '../../data-fields/enumeration-field/models/dynamic-enumeration-field';
import {DataGroup} from '../../resources/interface/data-groups';
import {EventQueueService} from '../../event-queue/services/event-queue.service';
import {QueuedEvent} from '../../event-queue/model/queued-event';
import {AfterAction} from '../../utility/call-chain/after-action';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {TaskSetDataRequestContext} from '../models/task-set-data-request-context';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {EventService} from '../../event/services/event.service';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';
import {TaskFields} from '../../task-content/model/task-fields';
import {EnumerationField} from "../../data-fields/enumeration-field/models/enumeration-field";

/**
 * Handles the loading and updating of data fields and behaviour of
 * a single Task object managed by a {@link TaskContentService} instance.
 */
@Injectable()
export class TaskDataService extends TaskHandlingService implements OnDestroy {

    protected _updateSuccess$: Subject<boolean>;
    protected _dataReloadSubscription: Subscription;

    constructor(protected _taskState: TaskRequestStateService,
                protected _translate: TranslateService,
                protected _log: LoggerService,
                protected _snackBar: SnackBarService,
                protected _taskResourceService: TaskResourceService,
                protected _fieldConverterService: FieldConverterService,
                protected _taskEvent: TaskEventService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService,
                protected _afterActionFactory: CallChainService,
                protected _eventQueue: EventQueueService,
                protected _userComparator: UserComparatorService,
                protected _eventService: EventService,
                protected _changedFieldsService: ChangedFieldsService) {
        super(_taskContentService, _selectedCaseService);
        this._updateSuccess$ = new Subject<boolean>();
        this._dataReloadSubscription = this._taskContentService.taskDataReloadRequest$.subscribe(queuedFrontendAction => {
            this.initializeTaskDataFields(this._afterActionFactory.create(success => {
                if (success && queuedFrontendAction) {
                    this._taskContentService.performFrontendAction(queuedFrontendAction);
                }
            }), true);
        });
    }

    ngOnDestroy(): void {
        this._updateSuccess$.complete();
        this._dataReloadSubscription.unsubscribe();
        if (this.isTaskPresent() && this._safeTask.dataGroups) {
            this._safeTask.dataGroups.forEach(group => {
                if (group && group.fields) {
                    group.fields.forEach(field => field.destroy());
                }
            });
        }
    }

    /**
     * Contains information about the success or failure of backend
     * calls in [updateTaskDataFields]{@link TaskDataService#updateTaskDataFields} method.
     */
    public get updateSuccess$(): Observable<boolean> {
        return this._updateSuccess$.asObservable();
    }

    /**
     * Loads the Data Fields of an uninitialized Task from backend
     * and populates the Task managed by {@link TaskContentService} with the appropriate objects.
     *
     * Beware that if the Task has some data already loaded this function does nothing
     * and only passes `true` to the `afterAction` argument.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     *
     * @param afterAction if the request completes successfully emits `true` into the Subject, otherwise `false` will be emitted
     * @param force set to `true` if you need force reload of all task data
     */
    public initializeTaskDataFields(afterAction: AfterAction = new AfterAction(), force = false): void {
        this._eventQueue.scheduleEvent(new QueuedEvent(
            () => {
                return this.isTaskPresent();
            },
            nextEvent => {
                this.performGetDataRequest(afterAction, force, nextEvent);
            }, nextEvent => {
                afterAction.resolve(false);
                nextEvent.resolve(false);
            }
        ));
    }

    /**
     * Performs a `getData` request on the task currently stored in the `taskContent` service
     * @param afterAction the action that should be performed after the request is processed
     * @param force set to `true` if you need force reload of all task data
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected performGetDataRequest(afterAction: AfterAction, force: boolean, nextEvent: AfterAction) {
        if (this._safeTask.dataSize > 0 && !force) {
            this.sendNotification(TaskEvent.GET_DATA, true);
            afterAction.resolve(true);
            this._taskContentService.$shouldCreate.next(this._safeTask.dataGroups);
            nextEvent.resolve(true);
            return;
        }
        if (force) {
            this._safeTask.dataSize = 0;
        }

        const gottenTaskId = this._safeTask.stringId;
        this._taskState.startLoading(gottenTaskId);

        this._taskResourceService.getData(gottenTaskId).pipe(take(1)).subscribe(dataGroups => {
            this.processSuccessfulGetDataRequest(gottenTaskId, dataGroups, afterAction, nextEvent);
        }, error => {
            this.processErroneousGetDataRequest(gottenTaskId, error, afterAction, nextEvent);
        });
    }

    /**
     * Processes a successful outcome of a `getData` request
     * @param gottenTaskId the ID of the task whose data was requested
     * @param dataGroups the returned data groups of the task
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected processSuccessfulGetDataRequest(gottenTaskId: string,
                                              dataGroups: Array<DataGroup>,
                                              afterAction: AfterAction,
                                              nextEvent: AfterAction): void {
        if (!this.isTaskRelevant(gottenTaskId)) {
            this._log.debug('current task changed before the get data response could be received, discarding...');
            this._taskState.stopLoading(gottenTaskId);
            afterAction.complete();
            nextEvent.resolve(false);
            return;
        }
        this._taskContentService.referencedTaskAndCaseIds = {};
        this._taskContentService.taskFieldsIndex = {};

        this._safeTask.dataGroups = dataGroups;
        if (dataGroups.length === 0) {
            this._log.info('Task has no data ' + this._safeTask);
            this._safeTask.dataSize = 0;
            this._taskContentService.taskFieldsIndex[this._safeTask.stringId] = {} as TaskFields;
        } else {
            this._taskContentService.referencedTaskAndCaseIds[this._safeTask.caseId] = [this._safeTask.stringId];
            dataGroups.forEach(group => {
                const dataGroupParentCaseId: string = group.parentCaseId === undefined ? this._safeTask.caseId : group.parentCaseId;
                const parentTaskId: string = group.parentTaskId === undefined ? this._safeTask.stringId : group.parentTaskId;
                const parentTransitionId: string = group.parentTransitionId === undefined ?
                    this._safeTask.transitionId : group.parentTransitionId;
                if (dataGroupParentCaseId !== this._safeTask.caseId) {
                    if (!this._taskContentService.referencedTaskAndCaseIds[dataGroupParentCaseId]) {
                        this._taskContentService.referencedTaskAndCaseIds[dataGroupParentCaseId] = [group.parentTaskId];
                    } else {
                        this._taskContentService.referencedTaskAndCaseIds[dataGroupParentCaseId].push(group.parentTaskId);
                    }
                } else if (dataGroupParentCaseId === this._safeTask.caseId
                    && parentTaskId !== this._safeTask.stringId
                    && !this._taskContentService.referencedTaskAndCaseIds[dataGroupParentCaseId].includes(parentTaskId)) {
                    this._taskContentService.referencedTaskAndCaseIds[dataGroupParentCaseId].push(group.parentTaskId);
                }
                if (group.fields.length > 0 && !this._taskContentService.taskFieldsIndex[parentTaskId]) {
                    this._taskContentService.taskFieldsIndex[parentTaskId] = {} as TaskFields;
                }
                if (group.fields.length > 0 && !this._taskContentService.taskFieldsIndex[parentTaskId].fields) {
                    this._taskContentService.taskFieldsIndex[parentTaskId].fields = {};
                }
                group.fields.forEach(field => {
                    this._taskContentService.taskFieldsIndex[parentTaskId].transitionId = parentTransitionId;
                    this._taskContentService.taskFieldsIndex[parentTaskId].fields[field.stringId] = field;
                    field.valueChanges().subscribe(() => {
                        if (this.wasFieldUpdated(field)) {
                            if (field instanceof DynamicEnumerationField) {
                                field.loading = true;
                                this.updateTaskDataFields(this._afterActionFactory.create(bool => {
                                    field.loading = false;
                                }));
                            } else {
                                this.updateTaskDataFields();
                            }
                        }
                    });
                    if (field instanceof FileField || field instanceof FileListField) {
                        field.changedFields$.subscribe((change: ChangedFieldsMap) => {
                            this._changedFieldsService.emitChangedFields(change);
                        });
                    }
                });
                this._safeTask.dataSize === undefined ?
                    this._safeTask.dataSize = group.fields.length :
                    this._safeTask.dataSize += group.fields.length;
            });
        }
        this._taskState.stopLoading(gottenTaskId);
        this.sendNotification(TaskEvent.GET_DATA, true);
        afterAction.resolve(true);
        nextEvent.resolve(true);
        this._taskContentService.$shouldCreate.next(this._safeTask.dataGroups);
        this._taskContentService.$shouldCreateCounter.next(this._taskContentService.$shouldCreateCounter.getValue() + 1);
    }

    /**
     * Processes an erroneous outcome of a `getData` request
     * @param gottenTaskId the ID of the task whose data was requested
     * @param error the returned error
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected processErroneousGetDataRequest(gottenTaskId: string,
                                             error: HttpErrorResponse | Error,
                                             afterAction: AfterAction,
                                             nextEvent: AfterAction) {
        this._taskState.stopLoading(gottenTaskId);
        this._log.debug('getting task data failed', error);

        if (!this.isTaskRelevant(gottenTaskId)) {
            this._log.debug('current task changed before the get data error could be received');
            afterAction.complete();
            nextEvent.resolve(false);
            return;
        }

        if (error instanceof HttpErrorResponse && error.status === 500 && error.error.message && error.error.message.startsWith('Could not find task with id')) {
            this._snackBar.openWarningSnackBar(this._translate.instant('tasks.snackbar.noLongerExists'));
            this._taskOperations.reload();
        } else if (error instanceof Error) {
            this._snackBar.openErrorSnackBar(this._translate.instant(error.message));
        } else {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.noGroup')}
                        ${this._taskContentService.task.title} ${this._translate.instant('tasks.snackbar.failedToLoad')}`);
        }
        this.sendNotification(TaskEvent.GET_DATA, false);
        afterAction.resolve(false);
        nextEvent.resolve(false);
    }

    /**
     * Collects all changed data fields and notifies the backend of the changes.
     *
     * If the request is successful clears the [changed]{@link DataField#changed} flag on all data fields that were a part of the request
     * and emits a {@link ChangedFields} object into this object's [changedFields$]{@link TaskDataService#changedFields$} stream.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     *
     * @param afterAction if the request completes successfully emits `true` into the Subject, otherwise `false` will be emitted
     */
    public updateTaskDataFields(afterAction: AfterAction = new AfterAction()): void {
        if (!this.isTaskPresent()) {
            this._log.debug('Task is not present. Update request ignored.');
            afterAction.resolve(false);
            return;
        }

        if (this._safeTask.user === undefined) {
            this._log.debug('current task is not assigned...');
            afterAction.resolve(false);
            return;
        }

        const setTaskId = this._safeTask.stringId;

        if (this._safeTask.dataSize <= 0) {
            afterAction.resolve(true);
            return;
        }

        const requestContext = this.createUpdateRequestContext();

        this._eventQueue.scheduleEvent(new QueuedEvent(
            () => this.isSetDataRequestStillValid(requestContext.body),
            nextEvent => {
                this.performSetDataRequest(setTaskId, requestContext.body, afterAction, nextEvent);
            },
            nextEvent => {
                this.revertSetDataRequest(requestContext);
                nextEvent.resolve(false);
            }
        ));
    }

    /**
     * @ignore
     * Goes over all the data fields in the managed Task and if they are valid and changed adds them to the set data request
     */
    protected createUpdateRequestContext(): TaskSetDataRequestContext {
        const context: TaskSetDataRequestContext = {
            body: {},
            previousValues: {}
        };

        this._safeTask.dataGroups.filter(dataGroup => dataGroup.parentTaskId === undefined).forEach(dataGroup => {
            dataGroup.fields.filter(field => this.wasFieldUpdated(field)).forEach(field => {
                context.body[this._task.stringId] = {};
                this.addFieldToSetDataRequestBody(context, this._task.stringId, field);
            });
        });
        this._safeTask.dataGroups.filter(dataGroup => dataGroup.parentTaskId !== undefined).forEach(dataGroup => {
            if (dataGroup.fields.some(field => this.wasFieldUpdated(field))) {
                context.body[dataGroup.parentTaskId] = {};
            } else {
                return;
            }
            dataGroup.fields.filter(field => this.wasFieldUpdated(field)).forEach(field => {
                this.addFieldToSetDataRequestBody(context, dataGroup.parentTaskId, field);
            });
        });
        return context;
    }

    protected addFieldToSetDataRequestBody(context: TaskSetDataRequestContext, taskId: string, field: DataField<any>): void {
        context.body[taskId][field.stringId] = {
            type: FieldConverterService.resolveType(field),
            value: this._fieldConverterService.formatValueForBackend(field, field.value)
        };
        context.previousValues[field.stringId] = field.previousValue;
        field.changed = false;
    }

    protected isAutocompleteEnumException(field: DataField<unknown>): boolean{
        return (field instanceof EnumerationField) && (field.getComponentType() === 'autocomplete') && !field.valid;
    }

    /**
     * @param field the checked field
     * @returns whether the field was updated on frontend and thus the backend should be notified
     */
    protected wasFieldUpdated(field: DataField<unknown>): boolean {
        return field.initialized && field.changed && (field.valid || field.sendInvalidValues) && (!this.isAutocompleteEnumException(field));
    }

    /**
     * Checks whether the request could still be performed by the logged user
     * @param request
     */
    protected isSetDataRequestStillValid(request: TaskSetDataRequestBody): boolean {
        if (!this.isTaskPresent()) {
            return false;
        }
        if (this._safeTask.user === undefined) {
            return false;
        }
        if (!this._userComparator.compareUsers(this._safeTask.user)) {
            return false;
        }
        const taskIdsInRequest: Array<string> = Object.keys(request);
        for (const taskId of taskIdsInRequest) {
            if (!Object.keys(this._taskContentService.taskFieldsIndex).includes(taskId)) {
                this._log.error(`Task id ${taskId} is not present in task fields index`);
                return false;
            }
            const fieldIdsOfRequest = Object.keys(request[taskId]);
            for (const fieldId of fieldIdsOfRequest) {
                const field = this._taskContentService.taskFieldsIndex[taskId].fields[fieldId];
                if (field === undefined) {
                    this._log.error(`Unexpected state. Datafield ${fieldId} of task ${taskId
                    } in setData request is not present in the task.`);
                    return false;
                }
                if (!field.behavior.editable) {
                    this._log.debug(`Field ${fieldId}, was meant to be set to
                    ${JSON.stringify(request[taskId][fieldId])
                    }, but is no loner editable.`);
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Performs a `setData` request on the task currently stored in the `taskContent` service
     * @param setTaskId ID of the task
     * @param body content of the `setData` request
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected performSetDataRequest(setTaskId: string, body: TaskSetDataRequestBody, afterAction: AfterAction, nextEvent: AfterAction) {
        if (Object.keys(body).length === 0) {
            this.sendNotification(TaskEvent.SET_DATA, true);
            afterAction.resolve(true);
            nextEvent.resolve(true);
            return;
        }

        this._taskState.startLoading(setTaskId);
        this._taskState.startUpdating(setTaskId);

        this._taskResourceService.setData(this._safeTask.stringId, body).pipe(take(1))
            .subscribe((response: EventOutcomeMessageResource) => {
                if (!this.isTaskRelevant(setTaskId)) {
                    this._log.debug('current task changed before the set data response could be received, discarding...');
                    this._taskState.stopLoading(setTaskId);
                    this._taskState.stopUpdating(setTaskId);
                    afterAction.complete();
                    nextEvent.resolve(false);
                    return;
                }
                if (response.success) {
                    this.processSuccessfulSetDataRequest(setTaskId, response, afterAction, nextEvent, body);
                } else if (response.error !== undefined) {
                    this.processUnsuccessfulSetDataRequest(setTaskId, response, afterAction, nextEvent, body);
                }
            }, error => {
                this.processErroneousSetDataRequest(setTaskId, error, afterAction, nextEvent, body);
            });
    }

    /**
     * Processes an unsuccessful outcome of a `setData` request
     * @param setTaskId the ID of the task whose data was set
     * @param response the resulting Event outcome of the set data request
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param body hold the data that was sent in request
     */
    protected processUnsuccessfulSetDataRequest(setTaskId: string,
                                                response: EventOutcomeMessageResource,
                                                afterAction: AfterAction,
                                                nextEvent: AfterAction,
                                                body: TaskSetDataRequestBody) {
        if (response.error !== '') {
            this._snackBar.openErrorSnackBar(this._translate.instant(response.error));
        } else {
            this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.failedSave'));
        }
        if (response.outcome) {
            const outcome = response.outcome;
            const changedFieldsMap: ChangedFieldsMap = this._eventService.parseChangedFieldsFromOutcomeTree(outcome);

            if (Object.keys(changedFieldsMap).length > 0) {
                this._changedFieldsService.emitChangedFields(changedFieldsMap);
            }
        }
        this.revertToPreviousValue();
        this.clearWaitingForResponseFlag(body);
        this.updateStateInfo(afterAction, false, setTaskId);
        nextEvent.resolve(false);
        this._taskOperations.reload();
    }

    /**
     * Processes a successful outcome of a `setData` request
     * @param setTaskId the ID of the task whose data was set
     * @param response the resulting Event outcome of the set data request
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param body hold the data that was sent in request
     */
    protected processSuccessfulSetDataRequest(setTaskId: string,
                                              response: EventOutcomeMessageResource,
                                              afterAction: AfterAction,
                                              nextEvent: AfterAction,
                                              body: TaskSetDataRequestBody) {
        const outcome = response.outcome;
        const changedFieldsMap: ChangedFieldsMap = this._eventService.parseChangedFieldsFromOutcomeTree(outcome);

        if (Object.keys(changedFieldsMap).length > 0) {
            this._changedFieldsService.emitChangedFields(changedFieldsMap);
        }
        this.clearWaitingForResponseFlag(body);
        this._snackBar.openSuccessSnackBar(!!outcome.message ? outcome.message : this._translate.instant('tasks.snackbar.dataSaved'));
        this.updateStateInfo(afterAction, true, setTaskId);
        nextEvent.resolve(true);
    }

    /**
     * Processes an erroneous outcome of a `setData` request
     * @param setTaskId the ID of the task whose data was set
     * @param error the returned error
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param body hold the data that was sent in request
     */
    protected processErroneousSetDataRequest(setTaskId: string,
                                             error: HttpErrorResponse,
                                             afterAction: AfterAction,
                                             nextEvent: AfterAction,
                                             body: TaskSetDataRequestBody) {
        this._log.debug('setting task data failed', error);

        if (!this.isTaskRelevant(setTaskId)) {
            this._log.debug('current task changed before the get data error could be received');
            this._taskState.stopLoading(setTaskId);
            this._taskState.stopUpdating(setTaskId);
            afterAction.complete();
            nextEvent.resolve(false);
            return;
        }

        this.revertToPreviousValue();
        this.clearWaitingForResponseFlag(body);
        this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.failedSave'));
        this.updateStateInfo(afterAction, false, setTaskId);
        nextEvent.resolve(false);
        this._taskOperations.reload();
    }

    /**
     * Reverts the effects of a failed `setData` request, so that the user sees current values.
     * @param context the context of the failed request
     */
    protected revertSetDataRequest(context: TaskSetDataRequestContext) {
        // this iteration could be improved if we had a map of all the data fields in a task
        const totalCount = Object.keys(context.body).length;
        let foundCount = 0;

        for (const datagroup of this._safeTask.dataGroups) {
            for (const field of datagroup.fields) {
                if (!context.body[field.stringId]) {
                    continue;
                }

                if (this.compareBackendFormattedFieldValues(
                    this._fieldConverterService.formatValueForBackend(field, field.value),
                    context.body[field.stringId].value)
                ) {
                    field.valueWithoutChange(context.previousValues[field.stringId]);
                }

                foundCount++;
                if (foundCount === totalCount) {
                    return;
                }
            }
        }

        this._log.error(`Invalid state. Some data fields of task ${this._safeTask.stringId}, are no longer present in it!`);
    }

    /**
     * Compares the values that are in the backend compatible format as given by the {@link FieldConverterService}
     * and determines whether they are the same value, or not.
     * @param current the current value (can also be called `value1` or `left`)
     * @param old the new value (can also be called `value2` or `right`)
     * @returns `true` if the values are the same and `false` otherwise
     */
    protected compareBackendFormattedFieldValues(current, old): boolean {
        if (Array.isArray(current)) {
            if (!Array.isArray(old)) {
                throw new Error('Illegal arguments! Cannot compare array value to non-array value');
            }

            if (current.length !== old.length) {
                return false;
            }

            return current.every((value, index) => old[index] === value);
        }

        return current === old;
    }

    /**
     * @ignore
     *
     * stops loading and updating indicators, and emits the `result` value
     * to both the `afterAction` and [_updateSuccess$]{@link TaskDataService#_updateSuccess$} streams.
     *
     * @param afterAction the call chain steam of the update data method
     * @param result result of the update data request
     * @param setTaskId the ID of the {@link Task}, who's state should be updated
     */
    protected updateStateInfo(afterAction: AfterAction, result: boolean, setTaskId: string): void {
        this._taskState.stopLoading(setTaskId);
        this._taskState.stopUpdating(setTaskId);
        if (this._updateSuccess$.observers.length !== 0) {
            this._updateSuccess$.next(result);
        }
        this.sendNotification(TaskEvent.SET_DATA, result);
        afterAction.resolve(result);
    }

    /**
     * Publishes a get/set data notification to the {@link TaskEventService}
     * @param event the event that occurred to the task
     * @param success whether the get/set data operation was successful or not
     */
    protected sendNotification(event: TaskEvent.GET_DATA | TaskEvent.SET_DATA, success: boolean): void {
        this._taskEvent.publishTaskEvent(createTaskEventNotification(this._safeTask, event, success));
    }

    private revertToPreviousValue(): void {
        this._safeTask.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (field.initialized && field.valid && field.changed) {
                    field.revertToPreviousValue();
                }
            });
        });
    }

    private clearWaitingForResponseFlag(body: TaskSetDataRequestBody) {
        Object.keys(body).forEach(taskId => {
            Object.keys(body[taskId]).forEach(fieldId => {
                this._taskContentService.taskFieldsIndex[taskId].fields[fieldId].waitingForResponse = false;
            });
        });
    }
}
