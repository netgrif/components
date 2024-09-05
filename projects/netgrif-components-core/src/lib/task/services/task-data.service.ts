import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {ChangedFields, FrontAction} from '../../data-fields/models/changed-fields';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskRequestStateService} from './task-request-state.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {FieldConverterService} from '../../task-content/services/field-converter.service';
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
import {FrontActionService} from "../../actions/services/front-action.service";
import {DataSet, TaskDataSets} from '../../resources/interface/task-data-sets';
import {
    DataFieldResource,
    DataFieldValue,
    LayoutContainerResource,
    LayoutItemResource
} from '../../task-content/model/resource-interfaces';
import {LayoutContainer} from '../../resources/interface/layout-container';
import {callActionRecursively} from '../../utility/layout-operations';
import {LayoutItem} from '../../resources/interface/layout-item';
import {
    GetDataLayoutsEventOutcome
} from '../../event/model/event-outcomes/data-outcomes/get-data-layouts-event-outcome';

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
                protected _changedFieldsService: ChangedFieldsService,
                protected _frontActionService: FrontActionService) {
        super(_taskContentService, _selectedCaseService);
        this._updateSuccess$ = new Subject<boolean>();
        this._dataReloadSubscription = this._taskContentService.taskDataReloadRequest$.subscribe(queuedFrontendAction => {
            this.initializeTaskDataFields(new AfterAction(), true);
        });
    }

    ngOnDestroy(): void {
        this._updateSuccess$.complete();
        this._dataReloadSubscription.unsubscribe();
        if (this.isTaskPresent() && this._safeTask.layoutContainer) {
            callActionRecursively(this._safeTask.layoutContainer, {doParams: undefined, termParams: undefined},
                (layoutItem: LayoutItem) => {
                    layoutItem.field.destroy();
                },
                () => {
                    return false;
                }
            );
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
            this._taskContentService.$shouldCreate.next(this._safeTask.layoutContainer);
            nextEvent.resolve(true);
            return;
        }
        if (force) {
            this._safeTask.dataSize = 0;
        }

        const gottenTaskId = this._safeTask.stringId;
        this._taskState.startLoading(gottenTaskId);

        this._taskResourceService.getData(gottenTaskId).pipe(take(1)).subscribe(response => {
            const layoutContainer = (response.outcome as GetDataLayoutsEventOutcome).layout;
            this.processSuccessfulGetDataRequest(gottenTaskId, this.processLayoutContainerResponse(layoutContainer), afterAction, nextEvent);
            this.emitChangedFields(response);
        }, error => {
            this.processErroneousGetDataRequest(gottenTaskId, error, afterAction, nextEvent);
        });
    }

    /**
     * Processes a successful outcome of a `getData` request
     * @param gottenTaskId the ID of the task whose data was requested
     * @param layoutContainer the returned data groups of the task
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected processSuccessfulGetDataRequest(gottenTaskId: string,
                                              layoutContainer: LayoutContainer,
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

        this._safeTask.layoutContainer = layoutContainer;
        if (!layoutContainer || !layoutContainer.hasData) {
            this._log.info('Task has no data ' + this._safeTask);
            this._safeTask.dataSize = 0;
            this._taskContentService.taskFieldsIndex[this._safeTask.stringId] = {} as TaskFields;
        } else {
            this._taskContentService.referencedTaskAndCaseIds[this._safeTask.caseId] = [this._safeTask.stringId];
            this.processGetDataRequestRecursively(layoutContainer);
        }
        this._taskState.stopLoading(gottenTaskId);
        this.sendNotification(TaskEvent.GET_DATA, true);
        afterAction.resolve(true);
        nextEvent.resolve(true);
        this._taskContentService.$shouldCreate.next(this._safeTask.layoutContainer);
        this._taskContentService.$shouldCreateCounter.next(this._taskContentService.$shouldCreateCounter.getValue() + 1);
    }

    protected processGetDataRequestRecursively(layoutContainer: LayoutContainer) {
        const layoutContainerParentCaseId: string = layoutContainer.parentCaseId === undefined ? this._safeTask.caseId : layoutContainer.parentCaseId;
        const parentTaskId: string = layoutContainer.parentTaskId === undefined ? this._safeTask.stringId : layoutContainer.parentTaskId;
        const parentTransitionId: string = layoutContainer.parentTransitionId === undefined ? this._safeTask.transitionId : layoutContainer.parentTransitionId;
        if (layoutContainerParentCaseId !== this._safeTask.caseId) {
            if (!this._taskContentService.referencedTaskAndCaseIds[layoutContainerParentCaseId]) {
                this._taskContentService.referencedTaskAndCaseIds[layoutContainerParentCaseId] = [layoutContainer.parentTaskId];
            } else {
                this._taskContentService.referencedTaskAndCaseIds[layoutContainerParentCaseId].push(layoutContainer.parentTaskId);
            }
        } else if (layoutContainerParentCaseId === this._safeTask.caseId && parentTaskId !== this._safeTask.stringId
            && !this._taskContentService.referencedTaskAndCaseIds[layoutContainerParentCaseId].includes(parentTaskId)) {
            this._taskContentService.referencedTaskAndCaseIds[layoutContainerParentCaseId].push(layoutContainer.parentTaskId);
        }
        if (!!layoutContainer && layoutContainer.hasData && !this._taskContentService.taskFieldsIndex[parentTaskId]) {
            this._taskContentService.taskFieldsIndex[parentTaskId] = {} as TaskFields;
        }
        if (!!layoutContainer && layoutContainer.hasData && !this._taskContentService.taskFieldsIndex[parentTaskId].fields) {
            this._taskContentService.taskFieldsIndex[parentTaskId].fields = {};
        }
        if (!!layoutContainer && layoutContainer.hasData) {
            this._taskContentService.taskFieldsIndex[parentTaskId].transitionId = parentTransitionId;
        }
        let fieldCounter = 0;
        layoutContainer.items.forEach(layoutItem => {
            if (!!layoutItem.field) {
                this._taskContentService.taskFieldsIndex[parentTaskId].fields[layoutItem.field.stringId] = layoutItem.field;
                layoutItem.field.valueChanges().subscribe(() => {
                    if (this.wasFieldUpdated(layoutItem.field)) {
                        if (layoutItem.field instanceof DynamicEnumerationField) {
                            layoutItem.field.loading = true;
                            this.updateTaskDataFields(this._afterActionFactory.create(bool => {
                                (layoutItem.field as DynamicEnumerationField).loading = false;
                            }));
                        } else {
                            this.updateTaskDataFields();
                        }
                    }
                });
                if (layoutItem.field instanceof FileField || layoutItem.field instanceof FileListField) {
                    layoutItem.field.changedFields$.subscribe((change: ChangedFieldsMap) => {
                        this._changedFieldsService.emitChangedFields(change);
                    });
                }
                fieldCounter++;
            }
            if (!!layoutItem.container) {
                this.processGetDataRequestRecursively(layoutItem.container);
            }
        });
        this._safeTask.dataSize === undefined ? this._safeTask.dataSize = fieldCounter : this._safeTask.dataSize += fieldCounter;
    }


    private processLayoutContainerResponse(layoutContainerResource: LayoutContainerResource): LayoutContainer {
        const layoutItemsArray = [];
        let hasData = false;
        if (!layoutContainerResource || !layoutContainerResource.items) {
            return undefined;
        }
        for (let containerItem of layoutContainerResource.items) {
            const layoutItem = this.processLayoutItemResponse(containerItem);
            if (!hasData && ((!!layoutItem.container && layoutItem.container.hasData) || !!layoutItem.field)) {
                hasData = true;
            }
            layoutItemsArray.push(layoutItem);
        }
        return {
            layoutType: layoutContainerResource.layoutType,
            properties: layoutContainerResource.properties,
            items: layoutItemsArray,
            hasData: hasData
        };
    }

    private processLayoutItemResponse(layoutItemResource: LayoutItemResource): LayoutItem {
        return {
            layoutType: layoutItemResource.layoutType,
            properties: layoutItemResource.properties,
            dataRefId: layoutItemResource.dataRefId,
            field: !!layoutItemResource.dataRef ? this._fieldConverterService.toClass(layoutItemResource.dataRef) : null,
            container: this.processLayoutContainerResponse(layoutItemResource.container)
        }
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
            body: {body: {}} as TaskDataSets,
            previousValues: {}
        };
        this.createUpdateRequestContextRecursively(context, this._safeTask.layoutContainer);
        return context;
    }

    protected createUpdateRequestContextRecursively(context: TaskSetDataRequestContext, layoutContainer: LayoutContainer) {
        const taskId = layoutContainer.parentTaskId === undefined ? this._task.stringId : layoutContainer.parentTaskId;
        if (!(taskId in context.body.body)) {
            context.body.body[taskId] = {fields: {}} as DataSet;
        }
        layoutContainer.items.forEach(layoutItem => {
            if (!!layoutItem.field) {
                if (this.wasFieldUpdated(layoutItem.field)) {
                    this.addFieldToSetDataRequestBody(context, taskId, layoutItem.field);
                }
            }
            if (!!layoutItem.container) {
                this.createUpdateRequestContextRecursively(context, layoutItem.container);
            }
        });
    }

    protected addFieldToSetDataRequestBody(context: TaskSetDataRequestContext, taskId: string, field: DataField<any>): void {
        context.body.body[taskId].fields[field.stringId] = {
            type: this._fieldConverterService.resolveType(field),
            value: {
                value: this._fieldConverterService.formatValueForBackend(field, field.value)
            } as DataFieldValue
        } as DataFieldResource;
        context.previousValues[field.stringId] = field.previousValue;
        field.changed = false;
    }

    protected isAutocompleteEnumException(field: DataField<unknown>): boolean {
        return (field instanceof EnumerationField) && (field.getComponentType() === 'autocomplete') && !(field.valid || field.value === null);
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
    protected isSetDataRequestStillValid(request: TaskDataSets): boolean {
        if (!this.isTaskPresent()) {
            return false;
        }
        if (this._safeTask.user === undefined) {
            return false;
        }
        if (!this._userComparator.compareUsers(this._safeTask.user)) {
            return false;
        }
        const taskIdsInRequest: Array<string> = Object.keys(request.body);
        for (const taskId of taskIdsInRequest) {
            if (!Object.keys(this._taskContentService.taskFieldsIndex).includes(taskId)) {
                this._log.error(`Task id ${taskId} is not present in task fields index`);
                return false;
            }
            const fieldIdsOfRequest = Object.keys(request.body[taskId].fields);
            for (const fieldId of fieldIdsOfRequest) {
                const field = this._taskContentService.taskFieldsIndex[taskId].fields[fieldId];
                if (field === undefined) {
                    this._log.error(`Unexpected state. Datafield ${fieldId} of task ${taskId
                    } in setData request is not present in the task.`);
                    return false;
                }
                if (!field.behavior.editable) {
                    this._log.debug(`Field ${fieldId}, was meant to be set to
                    ${JSON.stringify(request.body[taskId][fieldId])
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
     * @param context context of the `setData` request
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     */
    protected performSetDataRequest(setTaskId: string, context: TaskDataSets, afterAction: AfterAction, nextEvent: AfterAction) {
        if (Object.keys(context.body).length === 0) {
            this.sendNotification(TaskEvent.SET_DATA, true);
            afterAction.resolve(true);
            nextEvent.resolve(true);
            return;
        }

        this._taskState.startLoading(setTaskId);
        this._taskState.startUpdating(setTaskId);

        this._taskResourceService.setData(this._safeTask.stringId, context).pipe(take(1))
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
                    this.processSuccessfulSetDataRequest(setTaskId, response, afterAction, nextEvent, context);
                } else if (response.error !== undefined) {
                    this.processUnsuccessfulSetDataRequest(setTaskId, response, afterAction, nextEvent, context);
                }
            }, error => {
                this.processErroneousSetDataRequest(setTaskId, error, afterAction, nextEvent, context);
            });
    }

    /**
     * Processes an unsuccessful outcome of a `setData` request
     * @param setTaskId the ID of the task whose data was set
     * @param response the resulting Event outcome of the set data request
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param context hold the data that was sent in request
     */
    protected processUnsuccessfulSetDataRequest(setTaskId: string,
                                                response: EventOutcomeMessageResource,
                                                afterAction: AfterAction,
                                                nextEvent: AfterAction,
                                                context: TaskDataSets) {
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
        this.revertToPreviousValue(context);
        this.clearWaitingForResponseFlag(context);
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
     * @param context hold the data that was sent in request
     */
    protected processSuccessfulSetDataRequest(setTaskId: string,
                                              response: EventOutcomeMessageResource,
                                              afterAction: AfterAction,
                                              nextEvent: AfterAction,
                                              context: TaskDataSets) {
        this.emitChangedFields(response);
        this.clearWaitingForResponseFlag(context);
        this._snackBar.openSuccessSnackBar(!!response.outcome.message ? response.outcome.message : this._translate.instant('tasks.snackbar.dataSaved'));
        this.updateStateInfo(afterAction, true, setTaskId);
        nextEvent.resolve(true);
    }

    /**
     * Processes an erroneous outcome of a `setData` request
     * @param setTaskId the ID of the task whose data was set
     * @param error the returned error
     * @param afterAction the action that should be performed after the request is processed
     * @param nextEvent indicates to the event queue that the next event can be processed
     * @param context hold the data that was sent in request
     */
    protected processErroneousSetDataRequest(setTaskId: string,
                                             error: HttpErrorResponse,
                                             afterAction: AfterAction,
                                             nextEvent: AfterAction,
                                             context: TaskDataSets) {
        this._log.debug('setting task data failed', error);

        if (!this.isTaskRelevant(setTaskId)) {
            this._log.debug('current task changed before the get data error could be received');
            this._taskState.stopLoading(setTaskId);
            this._taskState.stopUpdating(setTaskId);
            afterAction.complete();
            nextEvent.resolve(false);
            return;
        }

        this.revertToPreviousValue(context);
        this.clearWaitingForResponseFlag(context);
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
        const totalCount = {value: Object.keys(context.body.body[this._safeTask.stringId]).length};
        let foundCount = {value: 0};
        callActionRecursively(this._safeTask.layoutContainer, {
                doParams: {foundCount: foundCount, context: context},
                termParams: {totalCount: totalCount, foundCount: foundCount}
            },
            (layoutItem: LayoutItem, params: { foundCount: { value: number }, context: TaskSetDataRequestContext }) => {
                if (layoutItem.field.stringId in params.context.body.body[this._safeTask.stringId]) {
                    if (this.compareBackendFormattedFieldValues(
                        this._fieldConverterService.formatValueForBackend(layoutItem.field, layoutItem.field.value),
                        params.context.body.body[this._safeTask.stringId][layoutItem.field.stringId].value)
                    ) {
                        layoutItem.field.valueWithoutChange(params.context.previousValues[layoutItem.field.stringId]);
                    }
                    params.foundCount.value++;
                }
            },
            (layoutItem: LayoutItem, params: { totalCount: { value: number }, foundCount: { value: number } }) => {
                return params.totalCount.value === params.foundCount.value;
            }
        )
        if (totalCount.value !== foundCount.value) {
            this._log.error(`Invalid state. Some data fields of task ${this._safeTask.stringId}, are no longer present in it!`);
        }
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

    protected revertToPreviousValue(context: TaskDataSets): void {
        callActionRecursively(this._safeTask.layoutContainer, {doParams: undefined, termParams: undefined},
            (layoutItem: LayoutItem) => {
                if (layoutItem.field.initialized && layoutItem.field.valid && Object.keys(context.body.previousValues).includes(layoutItem.field.stringId)) {
                    layoutItem.field.revertToPreviousValue();
                }
            },
            () => {
                return false;
            }
        );
    }

    private emitChangedFields(response: EventOutcomeMessageResource) {
        const outcome = response.outcome;
        const changedFieldsMap: ChangedFieldsMap = this._eventService.parseChangedFieldsFromOutcomeTree(outcome);
        const frontActions: Array<FrontAction> = this._eventService.parseFrontActionsFromOutcomeTree(outcome);

        if (Object.keys(changedFieldsMap).length > 0) {
            this._changedFieldsService.emitChangedFields(changedFieldsMap);
        }
        if (!!frontActions && frontActions.length > 0) {
            this._frontActionService.runAll(frontActions);
        }
    }

    protected clearWaitingForResponseFlag(body: TaskDataSets) {
        Object.keys(body.body).forEach(taskId => {
            Object.keys(body.body[taskId].fields).forEach(fieldId => {
                this._taskContentService.taskFieldsIndex[taskId].fields[fieldId].waitingForResponse = false;
            });
        });
    }
}
