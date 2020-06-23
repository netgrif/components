import {Injectable, OnDestroy} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {TaskGetRequestBody} from '../../../resources/interface/task-get-request-body';
import {Task} from '../../../resources/interface/task';
import {CallChainService} from '../../../utility/call-chain/call-chain.service';

@Injectable()
export class TreeTaskContentService implements OnDestroy {

    private _selectedCase: Case;

    constructor(protected _treeCaseService: TreeCaseViewService,
                protected _taskDataService: TaskDataService,
                protected _taskContentService: TaskContentService,
                protected _taskResourceService: TaskResourceService,
                protected _taskEventService: TaskEventService,
                protected _callChain: CallChainService,
                protected _cancel: CancelTaskService,
                protected _assign: AssignTaskService) {

        _taskContentService.$shouldCreate.next([]);

        _taskDataService.changedFields$.subscribe(changedFields => {
            this._taskContentService.updateFromChangedFields(changedFields);
        });
        _taskDataService.updateSuccess$.subscribe(result => {
            if (result) {
                this._treeCaseService.reloadCase$.next();
            }
        });
        _treeCaseService.loadTask$.asObservable().subscribe(selectedCase => {
            this.loadFeaturedTask(selectedCase);
        });
    }

    /**
     * Checks whether a Task object is currently selected and if it can be cancelled by the user
     */
    private get shouldCancelTask(): boolean {
        return this._taskContentService.task && this._taskEventService.canCancel();
    }

    /**
     * Checks whether the currently displayed task differs from the new one
     * @param newCase [Case]{@link Case} object that holds the newly selected {@link Task}
     * @returns `true` if the currently selected Case has a different ID from the newly selected Case.
     * If the IDs are the same returns `true` if the transition IDs are different.
     * Returns `false` otherwise.
     */
    private taskChanged(newCase: Case): boolean {
        const currentCaseId = this._selectedCase ? this._selectedCase.stringId : undefined;
        const newCaseId = newCase ? newCase.stringId : undefined;
        if (currentCaseId !== newCaseId) {
            return true;
        }

        const currentTransitionId = this.getTransitionId(this._selectedCase);
        const newTransitionId = this.getTransitionId(newCase);
        return currentTransitionId !== newTransitionId;
    }

    /**
     * Changes the currently displayed {@link Task} based on the selected {@link Case} from the Tree.
     * @param selectedCase the Case who's task should be now displayed
     */
    protected loadFeaturedTask(selectedCase: Case) {
        if (!this.taskChanged(selectedCase)) {
            return;
        }

        if (this.shouldCancelTask) {
            this._cancel.cancel();
        }

        this._selectedCase = selectedCase;

        const requestBody = this.getTaskRequestBody();
        if (requestBody === undefined) {
            this.clearCurrentTask();
            return;
        }

        this._taskResourceService.getTasks(requestBody).subscribe(page => {
            if (page && page.content && Array.isArray(page.content)) {
                this.switchToTask(page.content[0]);
            } else {
                this.clearCurrentTask();
            }
        });
    }

    /**
     * Creates a {@link TaskGetRequestBody} object that finds the specified Task for the currently selected Case in a Tree Case View
     * @returns a request body that finds tasks of the given case with task id that corresponds to the value in the `treeTaskTransitionId`
     * immediate data field. Returns `undefined` if the request body cannot be created.
     */
    protected getTaskRequestBody(): TaskGetRequestBody | undefined {
        const transitionId = this.getTransitionId(this._selectedCase);
        if (transitionId) {
            return {
                case: this._selectedCase.stringId,
                transition: transitionId
            };
        }
        return undefined;
    }

    /**
     * @param examinedCase the {@link Case} object from which we want to extract the transition ID
     * @returns the ID of the transition that should be displayed in the {@link TaskContentComponent},
     * or `undefined` if the currently selected case doesn't define it
     */
    protected getTransitionId(examinedCase: Case): string | undefined {
        if (examinedCase && examinedCase.immediateData) {
            const transitionId = examinedCase.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId');
            return transitionId ? transitionId.value : undefined;
        }
        return undefined;
    }

    /**
     * Notifies all connected Services that no Task is currently selected
     */
    protected clearCurrentTask(): void {
        this._taskContentService.task = undefined;
    }

    /**
     * Changes the currently selected {@link Task}.
     * @param task the Task that should now be selected
     */
    protected switchToTask(task: Task): void {
        this._taskContentService.task = task;
        this._assign.assign(this._callChain.create(b => this.afterAssignCallback(b)));
    }

    /**
     * initializes the Task and reloads it's state after a successful assign
     * @param success whether the assign operation succeeded or not
     */
    protected afterAssignCallback(success: boolean): void {
        if (success) {
            this._taskResourceService.getTasks(this.getTaskRequestBody()).subscribe(page => {
                if (page && page.content && Array.isArray(page.content)) {
                    Object.assign(this._taskContentService.task, page.content[0]);
                }
            });
            this._taskDataService.initializeTaskDataFields();
        }
    }

    /**
     * Attempts to cancel the currently opened Task if the Task is in such state that allows cancellation.
     */
    ngOnDestroy(): void {
        if (this.shouldCancelTask) {
            this._cancel.cancel();
        }
    }
}
