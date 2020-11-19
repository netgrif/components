import {Injectable, OnDestroy} from '@angular/core';
import {DataGroup} from '../../resources/interface/data-groups';
import {Observable, ReplaySubject} from 'rxjs';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationField, EnumerationFieldValue} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField} from '../../data-fields/multichoice-field/models/multichoice-field';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {FieldConverterService} from './field-converter.service';
import {EventOutcome} from '../../resources/interface/event-outcome';

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
    $shouldCreate: ReplaySubject<DataGroup[]>;
    protected _task: Task;

    protected constructor(protected _fieldConverterService: FieldConverterService,
                          protected _snackBarService: SnackBarService,
                          protected _translate: TranslateService,
                          protected _logger: LoggerService) {
        this.$shouldCreate = new ReplaySubject<DataGroup[]>(1);
        this._task = undefined;
    }

    ngOnDestroy(): void {
        if (!this.$shouldCreate.closed) {
            this.$shouldCreate.complete();
        }
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
     * Changes the blocking state of all fields in the managed Task.
     * @param blockingState whether the field should be blocked or not
     */
    public blockFields(blockingState: boolean): void {
        if (this._task && this._task.dataGroups) {
            this._task.dataGroups.forEach(group => {
                group.fields.forEach(field => {
                    field.initialized$.subscribe(() => {
                        field.block = blockingState;
                    });
                });
            });
        }
    }

    /**
     * Clears the assignee, start date and finish date from the managed Task.
     */
    public updateStateData(eventOutcome: EventOutcome): void {
        if (this._task) {
            this._task.user = eventOutcome.assignee;
            this._task.startDate = eventOutcome.startDate;
            this._task.finishDate = eventOutcome.finishDate;
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
        this._task.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (chFields[field.stringId]) {
                    const updatedField = chFields[field.stringId];
                    Object.keys(updatedField).forEach(key => {
                        if (key === 'value') {
                            field.value = this._fieldConverterService.formatValueFromBackend(field, updatedField[key]);
                            field.changed = false;
                        } else if (key === 'behavior' && updatedField.behavior[this._task.transitionId]) {
                            field.behavior = updatedField.behavior[this._task.transitionId];
                        } else if (key === 'choices') {
                            const newChoices: EnumerationFieldValue[] = [];
                            if (updatedField.choices instanceof Array) {
                                updatedField.choices.forEach(it => {
                                    newChoices.push({key: it, value: it} as EnumerationFieldValue);
                                });
                            } else {
                                Object.keys(updatedField.choices).forEach(choiceKey => {
                                    newChoices.push({key: choiceKey, value: updatedField.choices[choiceKey]} as EnumerationFieldValue);
                                });
                            }
                            (field as EnumerationField | MultichoiceField).choices = newChoices;
                        } else if (key === 'options') {
                            const newOptions = [];
                            Object.keys(updatedField.options).forEach(optionKey => {
                                newOptions.push({key: optionKey, value: updatedField.options[optionKey]});
                            });
                            (field as EnumerationField | MultichoiceField).choices = newOptions;
                        } else if (key !== 'type') {
                            field[key] = updatedField[key];
                        }
                        field.update();
                    });
                }
            });
        });
        this.$shouldCreate.next(this._task.dataGroups);
    }
}
