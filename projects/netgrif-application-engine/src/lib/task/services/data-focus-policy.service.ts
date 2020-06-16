import {Injectable} from '@angular/core';
import {DataFocusPolicy} from '../../task-content/model/policy';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {Task} from '../../resources/interface/task';

@Injectable()
export class DataFocusPolicyService {

    constructor(protected _taskContentService: TaskContentService) {
    }

    /**
     * @ignore
     * Performs a check and returns the Task from the injected {@link TaskContentService} instance
     */
    private get _task(): Task {
        const task = this._taskContentService.task;
        if (!task) {
            throw new Error('DataFocusPolicyService cannot work without an initialized TaskContentService');
        }
        return task;
    }

    public buildDataFocusPolicy(success: boolean): void {
        if (this._task.dataFocusPolicy === DataFocusPolicy.autoRequired) {
            this.autoRequiredDataFocusPolicy(success);
        }
    }

    private autoRequiredDataFocusPolicy(success: boolean): void {
        if (success) {
            // TODO Implement focus in FUTURE, if someone wants this feature (for now we don't want it )
        }
    }
}
