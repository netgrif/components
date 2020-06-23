import {TaskContentService} from '../../task-content/services/task-content.service';
import {Task} from '../../resources/interface/task';

/**
 * Holds the common functionality for all Services that work with a single Task object.
 */
export abstract class TaskHandlingService {

    protected constructor(protected _taskContentService: TaskContentService) {
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
}
