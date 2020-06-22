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

@Injectable()
export class TreeTaskContentService implements OnDestroy {

    constructor(protected _treeCaseService: TreeCaseViewService,
                protected _taskDataService: TaskDataService,
                protected _taskContentService: TaskContentService,
                protected _taskResourceService: TaskResourceService,
                protected _taskEventService: TaskEventService,
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

        const requestBody = this.getTaskRequestBody(selectedCase);
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
     * Creates a {@link TaskGetRequestBody} object that finds the specified Task for the selected Case in a Tree Case View
     * @param selectedCase Case from a tree node
     * @returns a request body that finds tasks of the given case with task id that corresponds to the value in the `treeTaskTransitionId`
     * immediate data field. Returns `undefined` if the request body cannot be created.
     */
    protected getTaskRequestBody(selectedCase: Case): TaskGetRequestBody | undefined {
        if (selectedCase && selectedCase.immediateData) {
            const transitionId = selectedCase.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId');
            if (transitionId !== undefined) {
                return {
                    case: selectedCase.stringId,
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
        // continue here
        this._taskContentService.task = task;
        const after = new Subject<boolean>();
        const afterSecond = new Subject<boolean>();
        after.subscribe(bool => {
            if (bool) {
                this._taskResourceService.getTasks({
                    case: kaze.stringId,
                    transition: kaze.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId').value
                })
                    .subscribe(tazk => {
                        if (tazk && tazk.content && Array.isArray(tazk.content)) {
                            this._taskContentService.task = tazk.content[0];
                        }
                    });
                this._taskDataService.initializeTaskDataFields(afterSecond);
            } else {
                this.loading = false;
            }
            after.complete();
        });
        afterSecond.subscribe(bool => {
            if (bool) {
                this.show = true;
            }
            this.loading = false;
            afterSecond.complete();
        });
        this._assign.assign(after);
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
