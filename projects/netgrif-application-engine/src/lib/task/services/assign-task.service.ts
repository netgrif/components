import {Inject, Injectable, Optional} from '@angular/core';
import {Subject} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {SelectedCaseService} from './selected-case.service';


/**
 * Service that handles the logic of assigning a task.
 */
@Injectable()
export class AssignTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService,
                protected _taskState: TaskRequestStateService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                @Optional() _selectedCaseService: SelectedCaseService,
                _taskContentService: TaskContentService) {
        super(_taskContentService, _selectedCaseService);
    }

    /**
     * Performs the 'assign' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the assign operation.
     *
     * If the task held within the {@link TaskContentService} changes before a response is received, the response will be ignored
     * and the `afterAction` will not be executed.
     * @param afterAction if assign completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    public assign(afterAction = new Subject<boolean>()): void {
        const assignedTaskId = this._safeTask.stringId;

        if (this._taskState.isLoading(assignedTaskId)) {
            return;
        }
        if (this._safeTask.user) {
            this.completeSuccess(afterAction);
            return;
        }
        this._taskState.startLoading(assignedTaskId);

        this._taskResourceService.assignTask(this._safeTask.stringId).subscribe(response => {
            this._taskState.stopLoading(assignedTaskId);
            if (!this.isTaskRelevant(assignedTaskId)) {
                this._log.debug('current task changed before the assign response could be received, discarding...');
                return;
            }

            if (response.success) {
                this._taskContentService.removeStateData();
                this.completeSuccess(afterAction);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._taskState.stopLoading(assignedTaskId);
            this._log.debug('assigning task failed', error);

            if (!this.isTaskRelevant(assignedTaskId)) {
                this._log.debug('current task changed before the assign error could be received');
                return;
            }

            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
             ${this._taskContentService.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            afterAction.next(false);
        });
    }

    /**
     * @ignore
     * Reloads the task and emits `true` to the `afterAction` stream
     */
    private completeSuccess(afterAction: Subject<boolean>): void {
        this._taskOperations.reload();
        afterAction.next(true);
    }
}
