import {Inject, Injectable} from '@angular/core';
import {TaskHandlingService} from './task-handling-service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {FinishPolicy} from '../../task-content/model/policy';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {FinishTaskService} from './finish-task.service';
import {Subject} from 'rxjs';
import {AfterAction} from '../../utility/call-chain/after-action';

/**
 * Handles the sequence of actions that are performed when a task is being finished, based on the task's configuration.
 */
@Injectable()
export class FinishPolicyService extends TaskHandlingService {

    constructor(protected _dataFocusPolicyService: DataFocusPolicyService,
                protected _finishTaskService: FinishTaskService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                taskContentService: TaskContentService) {
        super(taskContentService);
    }

    /**
     * Performs the actions that correspond to the policy defined by the Task when it's finished.
     * @param afterAction the action that should be performed when the finish policy finishes
     */
    public performFinishPolicy(afterAction: AfterAction = new AfterAction()): void {
        if (this._safeTask.finishPolicy === FinishPolicy.AUTO_NO_DATA && !!this._safeTask.user) {
            this.autoNoDataFinishPolicy(afterAction);
        } else {
            this.manualFinishPolicy(afterAction);
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Finish Policy]{@link FinishPolicy#AUTO_NO_DATA}.
     *
     * If the task has no data performs finish and [closes]{@link TaskOperations#close} the task.
     * Otherwise [opens]{@link TaskOperations#open} it and performs the [data focus policy]{@link DataFocusPolicyService}.
     *
     * @param afterAction the action that should be performed when the finish policy finishes
     */
    protected autoNoDataFinishPolicy(afterAction: AfterAction): void {
        if (this._safeTask.dataSize <= 0) {
            this._finishTaskService.validateDataAndFinish(afterAction);
        } else {
            this._taskOperations.open();
            this._dataFocusPolicyService.performDataFocusPolicy();
            afterAction.resolve(true);
        }
    }

    /**
     * Performs the actions that correspond to the [Manual Finish Policy]{@link FinishPolicy#MANUAL}.
     *
     * [Opens]{@link TaskOperations#open} the task and performs the [data focus policy]{@link DataFocusPolicyService}.
     *
     * @param afterAction the action that should be performed when the finish policy finishes
     */
    protected manualFinishPolicy(afterAction: Subject<boolean>): void {
        this._taskOperations.open();
        this._dataFocusPolicyService.performDataFocusPolicy();
        afterAction.next(true);
        afterAction.complete();
    }
}
