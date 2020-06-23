import {Injectable, OnDestroy} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {Subject} from 'rxjs';
import {Filter} from '../../../filter/models/filter';
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
     * Changes the currently displayed {@link Task} based on the selected {@link Case} from the Tree.
     * @param selectedCase the Case who's task should be now displayed
     */
    protected loadFeaturedTask(selectedCase: Case) {
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
        if (this._selectedCase && this._selectedCase.immediateData) {
            const transitionId = this._selectedCase.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId');
            if (transitionId !== undefined) {
                return {
                    case: this._selectedCase.stringId,
                    transition: transitionId.value
                };
            }
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
                    this._taskContentService.task = page.content[0];
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
