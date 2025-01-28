import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationField, EnumerationFieldValue} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField} from '../../data-fields/multichoice-field/models/multichoice-field';
import {Change, ChangedFields} from '../../data-fields/models/changed-fields';
import {FieldConverterService} from './field-converter.service';
import {FieldTypeResource} from '../model/field-type-resource';
import {DynamicEnumerationField} from '../../data-fields/enumeration-field/models/dynamic-enumeration-field';
import {Validation} from '../../data-fields/models/validation';
import {TaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/task-event-outcome';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {TaskFields} from '../model/task-fields';
import {TaskRefField} from "../../data-fields/task-ref-field/model/task-ref-field";
import {LayoutContainer} from '../../resources/interface/layout-container';
import {LayoutItem} from '../../resources/interface/layout-item';
import {callActionRecursively} from '../../utility/layout-operations';

/**
 * Acts as a communication interface between the Component that renders Task content and it's parent Component.
 * Also provides some general functionality that is needed when working with task content.
 *
 * Notable example of a parent Component is the {@link AbstractTaskPanelComponent}.
 *
 * Notable example of a task content renderer is the {@link AbstractTaskContentComponent}.
 */
@Injectable()
export abstract class TaskContentService implements OnDestroy {

    public static readonly FRONTEND_ACTIONS_KEY = '_frontend_actions';
    public static readonly ACTION = 'action';

    $shouldCreate: ReplaySubject<LayoutContainer>;
    $shouldCreateCounter: BehaviorSubject<number>;
    protected _task: Task;
    protected _taskDataReloadRequest$: Subject<Change>;
    protected _isExpanding$: BehaviorSubject<boolean>;
    protected _taskFieldsIndex: {
        [taskId: string]: TaskFields
    } = {};
    protected _referencedTaskAndCaseIds: { [caseId: string]: Array<string> } = {};

    protected constructor(protected _fieldConverterService: FieldConverterService,
                          protected _snackBarService: SnackBarService,
                          protected _translate: TranslateService,
                          protected _logger: LoggerService) {
        this.$shouldCreate = new ReplaySubject<LayoutContainer>(1);
        this.$shouldCreateCounter = new BehaviorSubject<number>(0);
        this._isExpanding$ = new BehaviorSubject<boolean>(false);
        this._task = undefined;
        this._taskDataReloadRequest$ = new Subject<Change>();
    }

    ngOnDestroy(): void {
        if (!this.$shouldCreate.closed) {
            this.$shouldCreate.complete();
        }
        this._taskDataReloadRequest$.complete();
        this._isExpanding$.complete();
    }

    /**
     * @returns the Task object if set and `undefined` otherwise
     */
    public abstract get task(): Task | undefined;

    /**
     * Setting a Task also emits it into the stream accessible by the [task$]{@link TaskContentService#task$} getter method.
     * @param task the Task that owns the content managed by this service
     */
    public abstract set task(task: Task);

    /**
     * Stream returns a {@link Task} object every time this object is set.
     *
     * Use [task]{@link TaskContentService#task} setter method to set the Task.
     */
    public abstract get task$(): Observable<Task>;

    /**
     * Stream that emits every time a data reload is requested.
     */
    public get taskDataReloadRequest$(): Observable<Change> {
        return this._taskDataReloadRequest$.asObservable();
    }


    get taskFieldsIndex(): { [p: string]: TaskFields } {
        return this._taskFieldsIndex;
    }

    set taskFieldsIndex(value: { [p: string]: TaskFields }) {
        this._taskFieldsIndex = value;
    }

    get referencedTaskAndCaseIds(): { [p: string]: Array<string> } {
        return this._referencedTaskAndCaseIds;
    }

    set referencedTaskAndCaseIds(value: { [p: string]: Array<string> }) {
        this._referencedTaskAndCaseIds = value;
    }

    /**
     * Whether the panel that the task content is contained in is currently expanding.
     *
     * If the task content is not contained in a panel, `isExpanding` will be always `false`.
     */
    public get isExpanding(): boolean {
        return this._isExpanding$.value;
    }

    /**
     * Changes the state of the task content to `expanding`.
     */
    public expansionStarted(): void {
        this._isExpanding$.next(true);
    }

    /**
     * Changes the state of the task content to `not expanding`.
     */
    public expansionFinished(): void {
        this._isExpanding$.next(false);
    }

    /**
     * Checks the validity of all data fields in the managed {@link Task}.
     *
     * If some of the fields are invalid touches them so their validation errors will appear (if set).
     * A snackbar will also be displayed to the user, informing them of the fact that the fields are invalid.
     * @returns whether the task is valid or not
     */
    public validateTaskData(taskId?: string): boolean {
        if (!this._task || !this._task.layoutContainer) {
            return false;
        }
        const validity = this.validateTaskDataRecursively(this._task.layoutContainer, taskId);
        if (!validity.valid) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.invalidData'));
            callActionRecursively(this._task.layoutContainer, {doParams: undefined, termParams: undefined},
                (layoutItem: LayoutItem) => {
                    if (!layoutItem.container) {
                        layoutItem.field.touch = true;
                    }
                },
                () => {
                    return false;
                }
            );
        }
        if (!validity.validRequired) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.missingRequired'));
        }
        return validity.valid && validity.validRequired;
    }

    private validateTaskDataRecursively(layoutContainer: LayoutContainer, taskId?: string): any {
        const isRelevant = !!layoutContainer.parentTaskId && !!taskId ? layoutContainer.parentTaskId === taskId : true;
        let validity = {
            valid: true,
            validRequired: true
        }
        for (let layoutItem of layoutContainer.items) {
            if (!!layoutItem.field && !layoutItem.container && !layoutItem.field.disabled && isRelevant) {
                if (!layoutItem.field.valid) {
                    validity.valid = false;
                }
                if (!layoutItem.field.validRequired) {
                    validity.validRequired = false;
                }
            }
            if (!!layoutItem.container) {
                const childContainerValidity = this.validateTaskDataRecursively(layoutItem.container, taskId);
                if (!childContainerValidity.valid) {
                    validity.valid = false;
                }
                if (!childContainerValidity.validRequired) {
                    validity.validRequired = false;
                }
            }
            if (!validity.valid && !validity.validRequired) {
                return validity;
            }
        }
        return validity;
    }

    /**
     * Finds invalid data of task
     *
     * @returns array of invalid datafields
     */
    public getInvalidTaskData(): Array<DataField<any>> {
        const invalidFields = [];
        callActionRecursively(this._task.layoutContainer, {doParams: invalidFields, termParams: undefined},
            (layoutItem: LayoutItem, params: Array<DataField<any>>) => {
                if (!layoutItem.container && !layoutItem.field.disabled && (!layoutItem.field.valid || !layoutItem.field.validRequired)) {
                    params.push(layoutItem.field);
                }
            },
            () => {
                return false;
            }
        );
        return invalidFields;
    }

    public validateDynamicEnumField(): boolean {
        if (!this._task || !this._task.layoutContainer) {
            return false;
        }
        let exists = {value: false};
        callActionRecursively(this._task.layoutContainer, {doParams: exists, termParams: exists},
            (layoutItem: LayoutItem, params: { value: boolean }) => {
                if (!layoutItem.container && layoutItem.field instanceof DynamicEnumerationField) {
                    params.value = true;
                }
            },
            (layoutItem: LayoutItem, params: { value: boolean }) => {
                return params.value;
            }
        );
        if (!exists.value) {
            return true;
        }
        let valid = {value: true};
        callActionRecursively(this._task.layoutContainer, {doParams: valid, termParams: undefined},
            (layoutItem: LayoutItem, params: {value: boolean}) => {
                const field = layoutItem.field;
                if (!layoutItem.container && field instanceof DynamicEnumerationField) {
                    if (field.choices !== undefined && field.choices.length !== 0 && field.value !== undefined && field.value !== '') {
                        if (!field.choices.some(choice => choice.key === field.value)) {
                            field.value = '';
                            if (field.behavior.required) {
                                params.value = false;
                            }
                        }
                    }
                }
            },
            () => {
                return false;
            }
        );
        if (!valid.value) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.missingRequired'));
        }
        return valid.value;
    }

    /**
     * Changes the blocking state of all fields in the managed Task.
     * @param blockingState whether the field should be blocked or not
     */
    public blockFields(blockingState: boolean): void {
        console.log("TASK CONTENT BLOCK => " + blockingState);
        if (this._task && this._task.layoutContainer) {
            callActionRecursively(this._task.layoutContainer, {doParams: blockingState, termParams: undefined},
                (layoutItem: LayoutItem, params: boolean) => {
                    if (!layoutItem.container) {
                        layoutItem.field.block = params;
                    }
                },
                () => {
                    return false;
                }
            );
        }
    }

    /**
     * Clears the assignee, start date and finish date from the managed Task.
     */
    public updateStateData(eventOutcome: TaskEventOutcome): void {
        if (this._task) {
            this._task.user = eventOutcome.task.user;
            this._task.startDate = eventOutcome.task.startDate;
            this._task.finishDate = eventOutcome.task.finishDate;
        }
    }

    /**
     * Updates the properties of fields in the managed task based on a delta of changes from previous state.
     * @param chFields object containing the delta of the changes from the previous state
     */
    public updateFromChangedFields(chFields: ChangedFields): void {
        if (!this._task || !this._task.layoutContainer) {
            return;
        }
        // todo actions owner zbytočný?
        const frontendActions = chFields.taskId === this.task.stringId && chFields[TaskContentService.FRONTEND_ACTIONS_KEY];
        Object.keys(chFields).forEach(changedField => {
            if (this.isFieldInTask(chFields.taskId, changedField)) {
                this.updateField(chFields, this.taskFieldsIndex[chFields.taskId].fields[changedField], frontendActions);
            } else if (!!this.getReferencedTaskId(changedField)) {
                this.updateReferencedField(chFields, this.taskFieldsIndex[this.getReferencedTaskId(changedField)].fields[changedField], frontendActions);
            }
        });

        this.$shouldCreate.next(this._task.layoutContainer);
    }

    protected updateField(chFields: ChangedFields, field: DataField<any>, frontendActions: Change): void {
        if (this._fieldConverterService.resolveType(field) === FieldTypeResource.TASK_REF) {
            this._taskDataReloadRequest$.next(frontendActions ? frontendActions : undefined);
            return;
        }

        const updatedField = chFields[field.stringId];
        Object.keys(updatedField).forEach(key => {
            switch (key) {
                case 'type':
                    // type is just an information, not an update. A field cannot change its type
                    return; // continue - the field does not need updating, since nothing changed
                case 'value':
                    field.valueWithoutChange(this._fieldConverterService.formatValueFromBackend(field, updatedField[key][key]));
                    break;
                case 'behavior':
                    if (updatedField.behavior[this._task.transitionId]) {
                        // TODO NGSD-489 fix behavior resolution
                        field.behavior = updatedField.behavior[this._task.transitionId];
                    } else {
                        const transitionId = this.getReferencedTransitionId(field.stringId);
                        if (!!transitionId && transitionId !== '' && updatedField.behavior[transitionId])
                            field.behavior = updatedField.behavior[transitionId];
                        break;
                    }
                    break;
                case 'choices':
                    const newChoices: Array<EnumerationFieldValue> = [];
                    if (updatedField.choices instanceof Array) {
                        updatedField.choices.forEach(it => {
                            newChoices.push({key: it, value: it} as EnumerationFieldValue);
                        });
                    } else {
                        Object.keys(updatedField.choices).forEach(choiceKey => {
                            newChoices.push({
                                key: choiceKey,
                                value: updatedField.choices[choiceKey]
                            } as EnumerationFieldValue);
                        });
                    }
                    (field as EnumerationField | MultichoiceField).choices = newChoices;
                    (field as EnumerationField | MultichoiceField).updateChoice();
                    break;
                case 'options':
                    const newOptions = [];
                    Object.keys(updatedField.options).forEach(optionKey => {
                        newOptions.push({key: optionKey, value: updatedField.options[optionKey]});
                    });
                    (field as EnumerationField | MultichoiceField).choices = newOptions;
                    (field as EnumerationField | MultichoiceField).updateChoice();
                    break;
                case 'validations':
                    field.replaceValidations(updatedField.validations.map(it => (it as Validation)));
                    break;
                default:
                    field[key] = updatedField[key];

            }
            field.update();
        });
    }

    protected updateReferencedField(chFields: ChangedFields, field: DataField<any>, frontendActions: Change): void {
        if (this._fieldConverterService.resolveType(field) === FieldTypeResource.TASK_REF) {
            this._taskDataReloadRequest$.next(frontendActions ? frontendActions : undefined);
            return;
        }
        const updatedField = chFields[field.stringId];
        Object.keys(updatedField).forEach(key => {
            switch (key) {
                case 'behavior': {
                    const taskId = this.getReferencedTaskId(field.stringId);
                    const taskRef = this.findTaskRefId(taskId, this.taskFieldsIndex[this._task.stringId].fields);
                    const transitionId = this.taskFieldsIndex[taskId].transitionId;
                    if (!!transitionId && transitionId !== '' && updatedField.behavior[transitionId])
                        field.behavior = taskRef.behavior.editable ? updatedField.behavior[transitionId] : taskRef.behavior;
                    break;
                }
                case 'value':
                    field.valueWithoutChange(this._fieldConverterService.formatValueFromBackend(field, updatedField[key]));
                    break;
                default:
                    field[key] = updatedField[key];
            }
            field.update();
        });
    }

    protected isFieldInTask(taskId: string, changedField: string): boolean {
        return !!taskId
            && !!this.taskFieldsIndex[taskId]
            && !!this.taskFieldsIndex[taskId].fields
            && !!this.taskFieldsIndex[taskId].fields[changedField]
    }

    protected getReferencedTaskId(changedField: string): string {
        return !!this.taskFieldsIndex ?
            Object.keys(this.taskFieldsIndex).find(taskId => taskId !== this.task.stringId && Object.keys(this.taskFieldsIndex[taskId].fields).includes(changedField)) : undefined;
    }

    protected getReferencedTransitionId(changedField: string): string {
        if (!!this.taskFieldsIndex) {
            const taskFieldsIndexId = this.getReferencedTaskId(changedField);
            if (!!this.taskFieldsIndex[taskFieldsIndexId]) {
                return this.taskFieldsIndex[taskFieldsIndexId].transitionId;
            }
        }
        return undefined;
    }

    protected findTaskRefId(taskId: string, fields: { [fieldId: string]: DataField<any> }): DataField<any> {
        let taskRefId = Object.values(fields).find(f => f instanceof TaskRefField && f.value.includes(taskId));
        if (!taskRefId) {
            const referencedTaskIds = Object.values(fields).filter(f => f instanceof TaskRefField).map(tr => tr.value);
            referencedTaskIds.forEach(id => {
                taskRefId = this.findTaskRefId(taskId, this.taskFieldsIndex[id].fields);
                if (!!taskRefId) {
                    return taskRefId;
                }
            });
        }
        return taskRefId
    }
}
