import {TaskContentService} from '../../task-content/services/task-content.service';
import {Task} from '../../resources/interface/task';
import {SelectedCaseService} from './selected-case.service';

/**
 * Holds the common functionality for all Services that work with a single Task object.
 */
export abstract class TaskHandlingService {

    /**
     * @param _taskContentService the service that holds the currently selected task, that is handled by the implementation of this class
     * @param _selectedCaseService an optional service, that holds the currently selected case.
     * It should be injected with the `@Optional()` annotation, since it might not be always provided.
     */
    protected constructor(protected _taskContentService: TaskContentService,
                          protected _selectedCaseService: SelectedCaseService = null) {
    }

    /**
     * @returns the Task object held by {@link TaskContentService} or `undefined` if the Service currently holds no Task.
     */
    protected get _task(): Task | undefined {
        return this._taskContentService.task;
    }

    /**
     * Throws an error if the {@link TaskContentService} didn't have the Task object set yet.
     *
     * @returns the Task object held by {@link TaskContentService}.
     */
    protected get _safeTask(): Task {
        const task = this._taskContentService.task;
        if (!task) {
            throw new Error('Attempting to access Task object of an uninitialized TaskContentService');
        }
        return task;
    }

    /**
     * @returns `true` if a {@link Task} instance is set, `false` otherwise
     */
    protected isTaskPresent(): boolean {
        return !!this._taskContentService.task;
    }

    /**
     * Checks whether the current state of the {@link TaskContentService} and optionally if the {@link SelectedCaseService}, is still
     * relevant to the task that was requested.
     *
     * This method is useful if you use {@link UnlimitedTaskContentService}, or a similar implementation. It is possible for the currently
     * "selected" task to change in-between a backend request was sent and the response was received. In that case the response is no longer
     * relevant and should be discarded, otherwise an illegal task state could be achieved on frontend.
     * @param requestedTaskId the `stringId` of the requested task
     * @returns `true` if the requested task is still relevant to the state of the frontend. Returns `false` otherwise.
     */
    protected isTaskRelevant(requestedTaskId: string): boolean {
        return this.isTaskPresent()
            && this._task.stringId === requestedTaskId
            && (!this._selectedCaseService
                || (!!this._selectedCaseService
                    && !!this._selectedCaseService.selectedCase
                    && this._task.caseId === this._selectedCaseService.selectedCase.stringId
                )
            );
    }
}
