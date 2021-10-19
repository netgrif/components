import {Inject, Injectable, OnDestroy} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {Task} from '../../../resources/interface/task';
import {AssignPolicyService} from '../../../task/services/assign-policy.service';
import {AssignPolicy} from '../../../task-content/model/policy';
import {NAE_TASK_OPERATIONS} from '../../../task/models/task-operations-injection-token';
import {SubjectTaskOperations} from '../../../task/models/subject-task-operations';
import {UserComparatorService} from '../../../user/services/user-comparator.service';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';
import {CallChainService} from '../../../utility/call-chain/call-chain.service';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {hasContent} from '../../../utility/pagination/page-has-content';
import {getImmediateData} from '../../../utility/get-immediate-data';
import {filter} from 'rxjs/operators';
import {LoggerService} from '../../../logger/services/logger.service';
import {SelectedCaseService} from '../../../task/services/selected-case.service';
import {Filter} from '../../../filter/models/filter';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {ChangedFieldsService} from '../../../changed-fields/services/changed-fields.service';
import {ChangedFieldsMap} from '../../../event/services/event.service';
import {ChangedFields} from '../../../data-fields/models/changed-fields';

@Injectable()
export class TreeTaskContentService implements OnDestroy {

    private _processingTaskChange: LoadingEmitter;
    private _displayedTaskText$: Subject<string>;
    /**
     * a unique identifier consisting of caseId and transition ID
     *
     * Is set if a reload of the given task is currently taking place, `undefined` otherwise.
     */
    private _reloadedTaskUniqueIdentifier: string;

    constructor(protected _treeCaseService: TreeCaseViewService,
                protected _taskDataService: TaskDataService,
                protected _taskContentService: TaskContentService,
                protected _taskResourceService: TaskResourceService,
                protected _taskEventService: TaskEventService,
                protected _assignPolicy: AssignPolicyService,
                protected _cancel: CancelTaskService,
                protected _userComparator: UserComparatorService,
                protected _callchain: CallChainService,
                protected _logger: LoggerService,
                protected _selectedCaseService: SelectedCaseService,
                protected _changedFieldsService: ChangedFieldsService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: SubjectTaskOperations) {
        this._processingTaskChange = new LoadingEmitter();
        this._displayedTaskText$ = new ReplaySubject<string>();

        this._changedFieldsService.changedFields$.subscribe((changedFieldsMap: ChangedFieldsMap) => {
            const filteredCaseIds: Array<string> = Object.keys(changedFieldsMap).filter(
                caseId => Object.keys(this._taskContentService.referencedTaskAndCaseIds).includes(caseId)
            );
            const changedFields: Array<ChangedFields> = [];
            filteredCaseIds.forEach(caseId => {
                const taskIds: Array<string> = this._taskContentService.referencedTaskAndCaseIds[caseId];
                changedFields.push(...this._changedFieldsService.parseChangedFieldsByCaseAndTaskIds(caseId, taskIds, changedFieldsMap));
            });
            changedFields.filter(fields => fields !== undefined).forEach(fields => {
                this._taskContentService.updateFromChangedFields(fields);
            });
        });
        _taskDataService.updateSuccess$.subscribe(result => {
            if (result) {
                this._treeCaseService.reloadCase$.next();
                this.resolveTaskBlockState();
            }
        });

        _treeCaseService.loadTask$.asObservable().pipe(filter(selectedCase => this.taskChanged(selectedCase))).subscribe(selectedCase => {
            this.cancelAndLoadFeaturedTask(selectedCase);
        });

        _taskOperations.reload$.subscribe(() => {
            this.updateTaskState();
            this._treeCaseService.reloadCase$.next();
        });
        _taskOperations.open$.subscribe(() => {
            this._taskContentService.blockFields(false);
        });
        _taskOperations.close$.subscribe(() => {
            this._taskContentService.blockFields(true);
        });
    }

    public get taskContentText$(): Observable<string> {
        return this._displayedTaskText$.asObservable();
    }

    public get processingTaskChange(): boolean {
        return this._processingTaskChange.isActive;
    }

    public displayEmptyTaskContent(): void {
        this._taskContentService.$shouldCreate.next([]);
        this._displayedTaskText$.next('caseTree.noTaskSelected');
    }

    /**
     * Cancels the currently selected {@link Task} if any. And then loads and assigns the new Task.
     * @param selectedCase the Case who's task should be now displayed
     */
    protected cancelAndLoadFeaturedTask(selectedCase: Case | undefined) {
        this._processingTaskChange.on();
        this._taskContentService.blockFields(true);
        if (this.shouldCancelTask) {
            this._cancel.cancel(this._callchain.create(success => {
                if (success) {
                    this._logger.debug('Old tree task successfully canceled');
                } else {
                    this._logger.warn('Old tree task could not be canceled');
                }
            }));
        }
        this.loadFeaturedTask(selectedCase);
    }

    /**
     * Changes the currently displayed {@link Task} based on the selected {@link Case} from the Tree.
     * @param selectedCase the Case who's task should be now displayed
     */
    protected loadFeaturedTask(selectedCase: Case | undefined): void {
        this._selectedCaseService.selectedCase = selectedCase;

        const requestBody = this.getTaskFilter();
        if (requestBody === undefined) {
            this.clearCurrentTask();
            return;
        }

        this._taskResourceService.getTasks(requestBody).subscribe(page => {
            if (hasContent(page)) {
                this.setStandardTaskText();
                this.switchToTask(page.content[0]);
            } else {
                this.clearCurrentTask();
            }
        });
    }

    /**
     * Checks whether the currently displayed task differs from the new one
     * @param newCase [Case]{@link Case} object that holds the newly selected {@link Task}
     * @returns `true` if the currently selected Case has a different ID from the newly selected Case.
     * If the IDs are the same returns `true` if the transition IDs are different.
     * Returns `false` otherwise.
     */
    private taskChanged(newCase: Case | undefined): boolean {
        const currentCaseId = this._selectedCaseService.selectedCase ? this._selectedCaseService.selectedCase.stringId : undefined;
        const newCaseId = newCase ? newCase.stringId : undefined;
        if (currentCaseId !== newCaseId) {
            return true;
        }

        const currentTransitionId = this.getTransitionId(this._selectedCaseService.selectedCase);
        const newTransitionId = this.getTransitionId(newCase);
        return currentTransitionId !== newTransitionId;
    }

    /**
     * Checks whether a Task object is currently selected and if it can be cancelled by the user
     */
    private get shouldCancelTask(): boolean {
        return this._taskContentService.task && this._taskEventService.canCancel();
    }

    /**
     * Creates a {@link Filter} object that finds the specified Task for the currently selected Case in a Tree Case View
     * @returns a request body that finds tasks of the given case with task id that corresponds to the value in the `treeTaskTransitionId`
     * immediate data field. Returns `undefined` if the request body cannot be created.
     */
    protected getTaskFilter(): Filter | undefined {
        const transitionId = this.getTransitionId(this._selectedCaseService.selectedCase);
        if (transitionId) {
            return SimpleFilter.fromTaskQuery({
                case: {id: this._selectedCaseService.selectedCase.stringId},
                transitionId
            });
        }
        return undefined;
    }

    /**
     * @param examinedCase the {@link Case} object from which we want to extract the transition ID
     * @returns the ID of the transition that should be displayed in the {@link AbstractTaskContentComponent},
     * or `undefined` if the currently selected case doesn't define it
     */
    protected getTransitionId(examinedCase: Case): string | undefined {
        if (examinedCase && examinedCase.immediateData) {
            const transitionId = getImmediateData(examinedCase, TreePetriflowIdentifiers.FEATURED_TRANSITION);
            return transitionId ? transitionId.value : undefined;
        }
        return undefined;
    }

    /**
     * Changes the currently selected {@link Task}.
     * @param task the Task that should now be selected
     */
    protected switchToTask(task: Task): void {
        if (task.caseId !== this._selectedCaseService.selectedCase.stringId) {
            this._logger.debug('Tree featured task has been loaded, but the selected case has changed since. Discarding...');
            return;
        }

        task.assignPolicy = AssignPolicy.auto;
        this._taskContentService.task = task;
        this._taskContentService.blockFields(true);
        this._assignPolicy.performAssignPolicy(true, this._callchain.create(() => {
            this._processingTaskChange.off();
        }));
    }

    /**
     * Notifies all connected Services that no Task is currently selected
     */
    protected clearCurrentTask(): void {
        this._taskContentService.task = undefined;
        this.displayEmptyTaskContent();
        this._processingTaskChange.off();
    }

    /**
     * Updates the state of the current Task from backend
     */
    protected updateTaskState(): void {
        const uniqueTaskIdentifier = this.getUniqueTaskIdentifier();
        if (uniqueTaskIdentifier === this._reloadedTaskUniqueIdentifier) {
            this._logger.debug('The currently selected task is already being reloaded. Ignoring reload request.');
            return;
        }
        this._reloadedTaskUniqueIdentifier = uniqueTaskIdentifier;
        this._taskResourceService.getTasks(this.getTaskFilter()).subscribe(page => {
            if (hasContent(page)) {
                if (this._taskContentService.task && this._taskContentService.task.stringId === page.content[0].stringId) {
                    this._reloadedTaskUniqueIdentifier = undefined;
                    Object.assign(this._taskContentService.task, page.content[0]);
                }
                this.resolveTaskBlockState();
            }
        });
    }

    /**
     * If the current {@link Task} is assigned to the current user it is unblocked. Otherwise it is blocked.
     */
    protected resolveTaskBlockState(): void {
        const taskShouldBeBlocked = !this._taskContentService.task
            || this._taskContentService.task.user === undefined
            || !this._userComparator.compareUsers(this._taskContentService.task.user);
        this._taskContentService.blockFields(taskShouldBeBlocked);
    }

    /**
     * Sets the noData text in the task content to it's default value
     */
    protected setStandardTaskText(): void {
        this._displayedTaskText$.next();
    }

    /**
     * Attempts to cancel the currently opened Task if the Task is in such state that allows cancellation.
     */
    ngOnDestroy(): void {
        if (this.shouldCancelTask) {
            this._cancel.cancel();
        }
    }

    /**
     * @returns a unique identifier for the currently selected task, that consists of it's case's id and it's transition id.
     *
     * Returns `undefined`, if no task is currently selected.
     */
    protected getUniqueTaskIdentifier(): string {
        if (!this._selectedCaseService.selectedCase) {
            return undefined;
        }
        return `${this._selectedCaseService.selectedCase.stringId}#${this.getTransitionId(this._selectedCaseService.selectedCase)}`;
    }
}
