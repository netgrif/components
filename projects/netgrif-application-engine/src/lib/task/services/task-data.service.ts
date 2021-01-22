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
import {DataFocusPolicyService} from './data-focus-policy.service';
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

/**
 * Handles the loading and updating of data fields and behaviour of
 * a single Task object managed by a {@link TaskContentService} instance.
 */
@Injectable()
export class TaskDataService extends TaskHandlingService implements OnDestroy {

    protected _updateSuccess$: Subject<boolean>;
    protected _changedFields$: Subject<ChangedFields>;
    protected _dataReloadSubscription: Subscription;

    constructor(protected _taskState: TaskRequestStateService,
                protected _translate: TranslateService,
                protected _log: LoggerService,
                protected _snackBar: SnackBarService,
                protected _taskResourceService: TaskResourceService,
                protected _fieldConverterService: FieldConverterService,
                protected _dataFocusPolicyService: DataFocusPolicyService,
                protected _taskEvent: TaskEventService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService,
                protected _afterActionFactory: CallChainService) {
        super(_taskContentService, _selectedCaseService);
        this._updateSuccess$ = new Subject<boolean>();
        this._changedFields$ = new Subject<ChangedFields>();
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
        this._changedFields$.complete();
        this._dataReloadSubscription.unsubscribe();
        this._safeTask.dataGroups.forEach(group => group.fields.forEach(field => field.destroy()));
    }

    /**
     * Contains update information for Tasks affected byt set data requests of the Task managed by {@link TaskContentService}.
     *
     * A new value is emitted any time a `changedFields` object is returned in response
     * to a successful [updateTaskDataFields]{@link TaskDataService#updateTaskDataFields} request.
     */
    public get changedFields$(): Observable<ChangedFields> {
        return this._changedFields$.asObservable();
    }

    /**
     * Contains information about the success or failure of backend
     * calls in [updateTaskDataFields]{@link TaskDataService#updateTaskDataFields} method.
     */
    public get updateSuccess$(): Observable<boolean> {
        return this._updateSuccess$.asObservable();
    }

    /**
     * Pushes the provided value into the [changedFields$]{@link TaskDataService#changedFields$} stream.
     * @param changedFields the change object. If the provided object is empty, no value is pushed into the stream.
     */
    public emitChangedFields(changedFields: ChangedFields) {
        if (changedFields === undefined || Object.keys(changedFields).length === 0) {
            return;
        }
        this._changedFields$.next(changedFields);
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
    public initializeTaskDataFields(afterAction = new Subject<boolean>(), force: boolean = false): void {
        if (!this.isTaskPresent()) {
            return;
        }

        if (this._safeTask.dataSize > 0 && !force) {
            this.sendNotification(TaskEvent.GET_DATA, true);
            afterAction.next(true);
            return;
        }
        if (force) {
            this._safeTask.dataSize = 0;
        }

        const gottenTaskId = this._safeTask.stringId;
        this._taskState.startLoading(gottenTaskId);

        this._taskResourceService.getData(this._safeTask.stringId).pipe(take(1)).subscribe(dataGroups => {
            if (!this.isTaskRelevant(gottenTaskId)) {
                this._log.debug('current task changed before the get data response could be received, discarding...');
                this._taskState.stopLoading(gottenTaskId);
                return;
            }

            this._safeTask.dataGroups = dataGroups;
            if (dataGroups.length === 0) {
                this._log.info('Task has no data ' + this._safeTask);
                this._safeTask.dataSize = 0;
            } else {
                dataGroups.forEach(group => {
                    group.fields.forEach(field => {
                        field.valueChanges().subscribe(() => {
                            if (this.wasFieldUpdated(field)) {
                                this.updateTaskDataFields();
                            }
                        });
                        if (field instanceof FileField || field instanceof FileListField) {
                            field.changedFields$.subscribe(change => {
                                this._changedFields$.next(change.changedFields);
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
            afterAction.next(true);
            this._taskContentService.$shouldCreate.next(this._safeTask.dataGroups);
        }, (error: HttpErrorResponse) => {
            this._taskState.stopLoading(gottenTaskId);
            this._log.debug('getting task data failed', error);

            if (!this.isTaskRelevant(gottenTaskId)) {
                this._log.debug('current task changed before the get data error could be received');
                return;
            }

            if (error.status === 500 && error.error.message && error.error.message.startsWith('Could not find task with id')) {
                this._snackBar.openWarningSnackBar(this._translate.instant('tasks.snackbar.noLongerExists'));
                this._taskOperations.reload();
            } else {
                this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.noGroup')}
             ${this._taskContentService.task.title} ${this._translate.instant('tasks.snackbar.failedToLoad')}`);
            }
            this.sendNotification(TaskEvent.GET_DATA, false);
            afterAction.next(false);
        });
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
    public updateTaskDataFields(afterAction = new Subject<boolean>()): void {
        if (!this.isTaskPresent()) {
            return;
        }

        if (this._safeTask.user === undefined) {
            this._log.debug('current task is not assigned...');
            return;
        }

        const setTaskId = this._safeTask.stringId;

        if (this._safeTask.dataSize <= 0) {
            return;
        }

        if (this._taskState.isUpdating(setTaskId)) {
            afterAction.next(true);
            return;
        }

        if (afterAction.observers.length === 0) {
            afterAction.subscribe(() => {
                this._dataFocusPolicyService.performDataFocusPolicy();
            });
        }

        const body = this.createUpdateRequestBody();

        if (Object.keys(body).length === 0) {
            this.sendNotification(TaskEvent.SET_DATA, true);
            afterAction.next(true);
            return;
        }

        this._taskState.startLoading(setTaskId);
        this._taskState.startUpdating(setTaskId);

        this._taskResourceService.setData(this._safeTask.stringId, body).pipe(take(1)).subscribe(response => {
            if (!this.isTaskRelevant(setTaskId)) {
                this._log.debug('current task changed before the set data response could be received, discarding...');
                this._taskState.stopLoading(setTaskId);
                this._taskState.stopUpdating(setTaskId);
                return;
            }

            if (response.changedFields && (Object.keys(response.changedFields).length !== 0)) {
                this._changedFields$.next(response.changedFields as ChangedFields);
            }
            this.clearChangedFlagFromDataFields(body);
            this._snackBar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.dataSaved'));
            this.updateStateInfo(afterAction, true, setTaskId);
        }, error => {
            this._log.debug('setting task data failed', error);

            if (!this.isTaskRelevant(setTaskId)) {
                this._log.debug('current task changed before the get data error could be received');
                this._taskState.stopLoading(setTaskId);
                this._taskState.stopUpdating(setTaskId);
                return;
            }

            this.revertToPreviousValue();
            this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.failedSave'));
            this.updateStateInfo(afterAction, false, setTaskId);
            this._taskOperations.reload();
        });
    }

    /**
     * @ignore
     * Goes over all the data fields in the managed Task and if they are valid and changed adds them to the set data request
     */
    protected createUpdateRequestBody(): TaskSetDataRequestBody {
        const body = {};
        this._safeTask.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (this.wasFieldUpdated(field)) {
                    body[field.stringId] = {
                        type: this._fieldConverterService.resolveType(field),
                        value: this._fieldConverterService.formatValueForBackend(field, field.value)
                    };
                }
            });
        });
        return body;
    }

    /**
     * @param field the checked field
     * @returns whether the field was updated on frontend and thus the backend should be notified
     */
    protected wasFieldUpdated(field: DataField<unknown>): boolean {
        return field.initialized && field.changed && (field.valid || field.sendInvalidValues);
    }

    /**
     * @ignore
     *
     * Goes over all the data fields from the request body and clears the [changed]{@link DataField#changed} flag on all of them.
     *
     * @param body body of the completed setData request
     */
    protected clearChangedFlagFromDataFields(body: TaskSetDataRequestBody): void {
        Object.keys(body).forEach(id => {
            this._safeTask.dataGroups.forEach(dataGroup => {
                const changed = dataGroup.fields.find(f => f.stringId === id);
                if (changed !== undefined) {
                    changed.changed = false;
                }
            });
        });
    }

    /**
     * @ignore
     *
     * stops loading and updating indicators, and emits the `result` value
     * to both the `afterAction` and [_updateSuccess$]{@link TaskDataService#_updateSuccess$} streams.
     *
     * @param afterAction the call chain steam of the update data method
     * @param result result of the update data request
     * @param setTaskId the Id of the {@link Task}, who's state should be updated
     */
    protected updateStateInfo(afterAction: Subject<boolean>, result: boolean, setTaskId: string): void {
        this._taskState.stopLoading(setTaskId);
        this._taskState.stopUpdating(setTaskId);
        if (this._updateSuccess$.observers.length !== 0) {
            this._updateSuccess$.next(result);
        }
        this.sendNotification(TaskEvent.SET_DATA, result);
        afterAction.next(result);
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
}
