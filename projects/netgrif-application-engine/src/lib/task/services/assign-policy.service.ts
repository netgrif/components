import {Inject, Injectable} from '@angular/core';
import {AssignPolicy} from '../../task-content/model/policy';
import {TaskHandlingService} from './task-handling-service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskDataService} from './task-data.service';
import {AssignTaskService} from './assign-task.service';
import {CancelTaskService} from './cancel-task.service';
import {FinishPolicyService} from './finish-policy.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {Subject} from 'rxjs';

/**
 * Handles the sequence of actions that are performed when a task is being assigned, based on the task's configuration.
 */
@Injectable()
export class AssignPolicyService extends TaskHandlingService {

    private _isForced = false;

    constructor(protected _taskDataService: TaskDataService,
                protected _assignTaskService: AssignTaskService,
                protected _cancelTaskService: CancelTaskService,
                protected _finishPolicyService: FinishPolicyService,
                protected _callchain: CallChainService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                taskContentService: TaskContentService) {
        super(taskContentService);
    }

    get forced() {
        return this._isForced;
    }

    set forced(bool: boolean) {
        this._isForced = bool;
    }

    /**
     * Performs the actions that correspond to the policy defined by the Task on it's assignment.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    public performAssignPolicy(taskOpened: boolean, afterAction: Subject<boolean> = new Subject<boolean>()): void {
        if (this._safeTask.assignPolicy === AssignPolicy.auto) {
            this.autoAssignPolicy(taskOpened, afterAction);
        } else {
            this.manualAssignPolicy(taskOpened, afterAction);
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Assign Policy]{@link AssignPolicy#auto}.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected autoAssignPolicy(taskOpened: boolean, afterAction: Subject<boolean>): void {
        if (taskOpened) {
            this.autoAssignOpenedPolicy(afterAction);
        } else {
            this.autoAssignClosedPolicy(afterAction);
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Assign Policy]{@link AssignPolicy#auto}
     * when a task is 'opening' (eg. task panel is expanding).
     *
     * Assigns the task, reloads the current task page, loads task data and performs the finish policy.
     *
     * See [finish policy]{@link FinishPolicyService#performFinishPolicy} for more information.
     *
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected autoAssignOpenedPolicy(afterAction: Subject<boolean>): void {
        this._assignTaskService.assign(
            this._callchain.create((assignSuccess => {
                this.afterAssignOpenPolicy(assignSuccess, afterAction);
            }))
        );
    }

    /**
     * Reloads the current page of tasks if the preceding assign operation succeeded. Then initializes the task's data fields.
     * @param assignSuccess whether the preceding assign succeeded or not
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected afterAssignOpenPolicy(assignSuccess: boolean, afterAction: Subject<boolean>): void {
        if (!assignSuccess) {
            afterAction.next(false);
            return;
        }

        this._taskDataService.initializeTaskDataFields(
            this._callchain.create((requestSuccessful) => {
                if (requestSuccessful) {
                    this._finishPolicyService.performFinishPolicy(afterAction);
                } else {
                    afterAction.next(false);
                }
            }),
            this._isForced
        );
    }

    /**
     * Requests a reload of the task and then requests the task to be closed.
     *
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected autoAssignClosedPolicy(afterAction: Subject<boolean>): void {
        this._cancelTaskService.cancel(
            this._callchain.create((requestSuccess) => {
                this._taskOperations.close();
                afterAction.next(requestSuccess);
            })
        );
    }

    /**
     * Performs the actions that correspond to the [Manual Assign Policy]{@link AssignPolicy#manual}.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected manualAssignPolicy(taskOpened: boolean, afterAction: Subject<boolean>): void {
        if (taskOpened) {
            this.manualAssignOpenedPolicy(afterAction);
        } else {
            afterAction.next(false);
        }
    }

    /**
     * Performs the actions that correspond to the [Manual Assign Policy]{@link AssignPolicy#manual}
     * when a task is 'opening' (eg. task panel is expanding).
     *
     * Loads task data and performs the [finish policy]{@link FinishPolicyService#performFinishPolicy}.
     *
     * See [finish policy]{@link FinishPolicyService#performFinishPolicy} for more information.
     *
     * @param afterAction the action that should be performed when the assign policy (and all following policies) finishes
     */
    protected manualAssignOpenedPolicy(afterAction: Subject<boolean>): void {
        this._taskDataService.initializeTaskDataFields(
            this._callchain.create((requestSuccessful) => {
                if (requestSuccessful) {
                    this._finishPolicyService.performFinishPolicy(afterAction);
                } else {
                    afterAction.next(false);
                }
            }),
            this._isForced
        );
    }
}
