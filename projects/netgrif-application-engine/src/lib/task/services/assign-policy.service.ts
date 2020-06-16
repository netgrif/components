import {Inject, Injectable} from '@angular/core';
import {AssignPolicy} from '../../task-content/model/policy';
import {Subject} from 'rxjs';
import {TaskHandlingService} from './task-handling-service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskDataService} from './task-data.service';
import {AssignTaskService} from './assign-task.service';
import {CancelTaskService} from './cancel-task.service';
import {FinishPolicyService} from './finish-policy.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';

/**
 * Handles the sequence of actions that are performed when a task is being assigned, based on the task's configuration.
 */
@Injectable()
export class AssignPolicyService extends TaskHandlingService {

    constructor(protected _taskViewService: TaskViewService,
                protected _taskDataService: TaskDataService,
                protected _assignTaskService: AssignTaskService,
                protected _cancelTaskService: CancelTaskService,
                protected _finishPolicyService: FinishPolicyService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                taskContentService: TaskContentService) {
        super(taskContentService);
    }

    /**
     * Performs the actions that correspond to the policy defined by the Task on it's assignment.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     */
    public performAssignPolicy(taskOpened: boolean): void {
        if (this._task.assignPolicy === AssignPolicy.auto) {
            this.autoAssignPolicy(taskOpened);
        } else {
            this.manualAssignPolicy(taskOpened);
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Assign Policy]{@link AssignPolicy#auto}.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     */
    protected autoAssignPolicy(taskOpened: boolean): void {
        if (taskOpened) {
            this.autoAssignOpenedPolicy();
        } else {
            this.autoAssignClosedPolicy();
        }
    }

    /**
     * Performs the actions that correspond to the [Auto Assign Policy]{@link AssignPolicy#auto}
     * when a task is 'opening' (eg. task panel is expanding).
     *
     * Assigns the task, reloads the current task page, loads task data and performs the finish policy.
     *
     * See both auto callchains [(1)]{@link AssignPolicyService#createAutoAssignOpenCallChain}
     * [(2)]{@link AssignPolicyService#createAutoAssignInitializeDataCallChain} of this class
     * and [finish policy]{@link FinishPolicyService#performFinishPolicy} for more information.
     */
    protected autoAssignOpenedPolicy(): void {
        this._assignTaskService.assign(
            this.createAutoAssignOpenCallChain()
        );
    }

    /**
     * Creates a call chain Subject that performs an action when a value is emitted into it.
     *
     * On emission:
     *
     * - reloads the current page of tasks
     *
     * - If the emitted value is `true` it [initializes the task data fields]{@link TaskDataService#initializeTaskDataFields}
     * and if it succeeds perform the [finish policy]{@link FinishPolicyService#performFinishPolicy} of the Task.
     *
     * @returns a subscribed Subject that completes after one emission.
     */
    protected createAutoAssignOpenCallChain(): Subject<boolean> {
        const callchain = new Subject<boolean>();
        callchain.subscribe(assignSuccess => {
            this._taskViewService.reloadCurrentPage();
            if (assignSuccess) {
                this._taskDataService.initializeTaskDataFields(
                    this.createAutoAssignInitializeDataCallChain()
                );
            }
            callchain.complete();
        });
        return callchain;
    }

    /**
     * Creates a call chain Subject that performs an action when a value is emitted into it.
     *
     * On emission:
     *
     * - If the emitted value is `true` it performs the [finish policy]{@link FinishPolicyService#performFinishPolicy} of the Task.
     *
     * @returns a subscribed Subject that completes after one emission.
     */
    protected createAutoAssignInitializeDataCallChain(): Subject<boolean> {
        const callchain = new Subject<boolean>();
        callchain.subscribe(requestSuccessful => {
            if (requestSuccessful) {
                this._finishPolicyService.performFinishPolicy();
            }
            callchain.complete();
        });
        return callchain;
    }

    /**
     * Performs the actions that correspond to the [Auto Assign Policy]{@link AssignPolicy#auto}
     * when a task is 'closing' (eg. task panel is collapsing).
     */
    protected autoAssignClosedPolicy(): void {
        this._cancelTaskService.cancel(
            this.createAutoAssignCloseCallChain()
        );
    }

    /**
     * Creates a call chain Subject that performs an action when a value is emitted into it.
     *
     * On emission:
     *
     * - reloads the current page of tasks
     *
     * @returns a subscribed Subject that completes after one emission.
     */
    protected createAutoAssignCloseCallChain(): Subject<boolean> {
        const callchain = new Subject<boolean>();
        callchain.subscribe(() => {
            this._taskViewService.reloadCurrentPage();
            this._taskOperations.close();
            callchain.complete();
        });
        return callchain;
    }

    /**
     * Performs the actions that correspond to the [Manual Assign Policy]{@link AssignPolicy#manual}.
     * @param taskOpened whether the Task was 'opened' (eg. task panel is expanding) or 'closed' (eg. task panel is collapsing)
     */
    protected manualAssignPolicy(taskOpened: boolean): void {
        if (taskOpened) {
            this.manualAssignOpenedPolicy();
        }
    }

    /**
     * Performs the actions that correspond to the [Manual Assign Policy]{@link AssignPolicy#manual}
     * when a task is 'opening' (eg. task panel is expanding).
     *
     * Loads task data and performs the [finish policy]{@link FinishPolicyService#performFinishPolicy}.
     *
     * See the manual callchain [(1)]{@link AssignPolicyService#createManualAssignOpenCalChain}
     * and [finish policy]{@link FinishPolicyService#performFinishPolicy} for more information.
     */
    protected manualAssignOpenedPolicy(): void {
        this._taskDataService.initializeTaskDataFields(
            this.createManualAssignOpenCalChain()
        );
    }

    /**
     * Creates a call chain Subject that performs an action when a value is emitted into it.
     *
     * On emission:
     *
     * - performs task's [finish policy]{@link FinishPolicyService#performFinishPolicy}
     *
     * @returns a subscribed Subject that completes after one emission.
     */
    protected createManualAssignOpenCalChain(): Subject<boolean> {
        const callchain = new Subject<boolean>();
        callchain.subscribe(requestSuccessful => {
            if (requestSuccessful) {
                this._finishPolicyService.performFinishPolicy();
            }
            callchain.complete();
        });
        return callchain;
    }
}
