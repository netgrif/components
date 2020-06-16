import {Inject, Injectable} from '@angular/core';
import {TaskHandlingService} from './task-handling-service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {FinishPolicy} from '../../task-content/model/policy';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {NAE_TASK_FINISH_EVENT} from '../models/task-finish-event-injection-token';
import {TaskFinishEvent} from '../interfaces/task-finish-event';

/**
 * Handles the sequence of actions that are performed when a task is being finished, based on the task's configuration.
 */
@Injectable()
export class FinishPolicyService extends TaskHandlingService {

    constructor(protected _dataFocusPolicyService: DataFocusPolicyService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Inject(NAE_TASK_FINISH_EVENT) protected _finishEvent: TaskFinishEvent,
                taskContentService: TaskContentService) {
        super(taskContentService);
    }

    /**
     * Performs the actions that correspond to the policy defined by the Task when it's finished.
     */
    public performFinishPolicy(): void {
        if (this._task.finishPolicy === FinishPolicy.autoNoData) {
            this.autoNoDataFinishPolicy();
        } else {
            this.manualFinishPolicy();
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Finish Policy]{@link FinishPolicy#autoNoData}.
     *
     * If the task has no data performs finish and [closes]{@link TaskOperations#close} the task.
     * Otherwise [opens]{@link TaskOperations#open} it and performs the [data focus policy]{@link DataFocusPolicyService}.
     */
    private autoNoDataFinishPolicy(): void {
        if (this._task.dataSize <= 0) {
            this._finishEvent.finish();
            this._taskOperations.close();
        } else {
            this._taskOperations.open();
            this._dataFocusPolicyService.performDataFocusPolicy();
        }
    }

    /**
     * Performs the actions that correspond to the [Manual Finish Policy]{@link FinishPolicy#manual}.
     *
     * [Opens]{@link TaskOperations#open} the task and performs the [data focus policy]{@link DataFocusPolicyService}.
     */
    private manualFinishPolicy(): void {
        this._taskOperations.open();
        this._dataFocusPolicyService.performDataFocusPolicy();
    }
}
