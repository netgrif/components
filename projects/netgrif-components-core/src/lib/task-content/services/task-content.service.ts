import {Injectable, OnDestroy} from '@angular/core';
import {DataGroup} from '../../resources/interface/data-groups';
import {BehaviorSubject, Observable, ReplaySubject, Subject, timer} from 'rxjs';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationField, EnumerationFieldValue} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField} from '../../data-fields/multichoice-field/models/multichoice-field';
import {Change, ChangedFields, FrontendActions} from '../../data-fields/models/changed-fields';
import {FieldConverterService} from './field-converter.service';
import {FieldTypeResource} from '../model/field-type-resource';
import {DynamicEnumerationField} from '../../data-fields/enumeration-field/models/dynamic-enumeration-field';
import {Validation} from '../../data-fields/models/validation';
import {TaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/task-event-outcome';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {TaskFields} from '../model/task-fields';

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

    private static readonly FRONTEND_ACTIONS_KEY = '_frontend_actions';
    private static readonly VALIDATE_FRONTEND_ACTION = 'validate';

    $shouldCreate: ReplaySubject<Array<DataGroup>>;
    $shouldCreateCounter: BehaviorSubject<number>;
    protected _task: Task;
    protected _taskDataReloadRequest$: Subject<FrontendActions>;
    protected _isExpanding$: BehaviorSubject<boolean>;
    private _taskFieldsIndex: {
        [taskId: string]: TaskFields
    } = {};
    private _referencedTaskAndCaseIds: { [caseId: string]: Array<string> } = {};

    protected constructor(protected _fieldConverterService: FieldConverterService,
                          protected _snackBarService: SnackBarService,
                          protected _translate: TranslateService,
                          protected _logger: LoggerService) {
        this.$shouldCreate = new ReplaySubject<Array<DataGroup>>(1);
        this.$shouldCreateCounter = new BehaviorSubject<number>(0);
        this._isExpanding$ = new BehaviorSubject<boolean>(false);
        this._task = undefined;
        this._taskDataReloadRequest$ = new Subject<FrontendActions>();
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
    public get taskDataReloadRequest$(): Observable<FrontendActions> {
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
    public validateTaskData(): boolean {
        if (!this._task || !this._task.dataGroups) {
            return false;
        }
        const valid = !this._task.dataGroups.some(group => group.fields.some(field => !field.valid && !field.disabled));
        const validDisabled = !this._task.dataGroups.some(group => group.fields.some(field => !field.validRequired && field.disabled));
        if (!valid) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.invalidData'));
            this._task.dataGroups.forEach(group => group.fields.forEach(field => field.touch = true));
        }
        if (!validDisabled) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.missingRequired'));
        }
        return valid && validDisabled;
    }

    /**
     * Finds invalid data of task
     *
     * @returns array of invalid datafields
     */
    public getInvalidTaskData(): Array<DataField<any>> {
        const invalidFields = [];
        this._task.dataGroups.forEach(group => invalidFields.push(...group.fields.filter(field =>
            (!field.valid && !field.disabled) || (!field.validRequired && !field.disabled))));
        return invalidFields;
    }

    public validateDynamicEnumField(): boolean {
        if (!this._task || !this._task.dataGroups) {
            return false;
        }
        const exists = this._task.dataGroups.some(group => group.fields.some(field => field instanceof DynamicEnumerationField));
        if (!exists) {
            return true;
        }
        let valid = true;
        for (const group of this._task.dataGroups) {
            for (const field of group.fields) {
                if (field instanceof DynamicEnumerationField) {
                    if (field.choices !== undefined && field.choices.length !== 0 && field.value !== '' && field.value !== undefined) {
                        if (!field.choices.some(choice => choice.key === field.value)) {
                            field.value = '';
                            if (field.behavior.required) {
                                valid = false;
                            }
                        }
                    }
                }
            }
        }
        if (!valid) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('tasks.snackbar.missingRequired'));
        }
        return valid;
    }

    /**
     * Changes the blocking state of all fields in the managed Task.
     * @param blockingState whether the field should be blocked or not
     */
    public blockFields(blockingState: boolean): void {
        if (this._task && this._task.dataGroups) {
            this._task.dataGroups.forEach(group => {
                group.fields.forEach(field => {
                    field.block = blockingState;
                });
            });
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
        if (!this._task || !this._task.dataGroups) {
            return;
        }
        // todo actions owner zbytočný?
        const frontendActions = chFields.taskId === this.task.stringId && chFields[TaskContentService.FRONTEND_ACTIONS_KEY];
        Object.keys(chFields).forEach(changedField => {
            let referencedTaskId: string;
            if (this.isFieldInTask(chFields.taskId, changedField)) {
                this.updateField(chFields, this.taskFieldsIndex[chFields.taskId].fields[changedField], frontendActions);
            } else if (!!(referencedTaskId = this.getReferencedTaskId(changedField))) {
                this.updateReferencedField(chFields, this.taskFieldsIndex[referencedTaskId].fields[changedField], frontendActions);
            }
        });

        this.$shouldCreate.next(this._task.dataGroups);
        this.performFrontendAction(frontendActions);
    }

    private updateField(chFields: ChangedFields, field: DataField<any>, frontendActions: Change): void {
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
                    field.valueWithoutChange(this._fieldConverterService.formatValueFromBackend(field, updatedField[key]));
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
                    break;
                case 'options':
                    const newOptions = [];
                    Object.keys(updatedField.options).forEach(optionKey => {
                        newOptions.push({key: optionKey, value: updatedField.options[optionKey]});
                    });
                    (field as EnumerationField | MultichoiceField).choices = newOptions;
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

    private updateReferencedField(chFields: ChangedFields, field: DataField<any>, frontendActions: Change): void {
        if (this._fieldConverterService.resolveType(field) === FieldTypeResource.TASK_REF) {
            this._taskDataReloadRequest$.next(frontendActions ? frontendActions : undefined);
            return;
        }
        const updatedField = chFields[field.stringId];
        Object.keys(updatedField).forEach(key => {
            switch (key) {
                case 'behavior':
                    const transitionId = this.getReferencedTransitionId(field.stringId);
                    if (!!transitionId && transitionId !== '' && updatedField.behavior[transitionId])
                        field.behavior = updatedField.behavior[transitionId];
                    break;
                default:
                    field[key] = updatedField[key];
            }
            field.update();
        });
    }

    /**
     * Performs the specific frontend action.
     *
     * A prototype implementation of frontend actions.
     *
     * The specifics are subject to change. It is very likely that this method will be moved to a different service.
     *
     * @param frontendAction the action that should be performed.
     */
    public performFrontendAction(frontendAction: FrontendActions): void {
        if (frontendAction && frontendAction.type === TaskContentService.VALIDATE_FRONTEND_ACTION) {
            timer().subscribe(() => this.validateTaskData());
        }
    }

    private isFieldInTask(taskId: string, changedField: string): boolean {
        return !!taskId
            && !!this.taskFieldsIndex[taskId]
            && !!this.taskFieldsIndex[taskId].fields
            && !!this.taskFieldsIndex[taskId].fields[changedField]
    }

    private getReferencedTaskId(changedField: string): string {
        return !!this.taskFieldsIndex ?
            Object.keys(this.taskFieldsIndex).find(taskId => taskId !== this.task.stringId && Object.keys(this.taskFieldsIndex[taskId].fields).includes(changedField)) : undefined;
    }

    private getReferencedTransitionId(changedField: string): string {
        if (!!this.taskFieldsIndex) {
            const taskFieldsIndexId = this.getReferencedTaskId(changedField);
            if (!!this.taskFieldsIndex[taskFieldsIndexId]) {
                return this.taskFieldsIndex[taskFieldsIndexId].transitionId;
            }
        }
        return undefined;
    }
}
