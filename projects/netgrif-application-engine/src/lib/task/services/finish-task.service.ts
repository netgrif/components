import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskDataService} from './task-data.service';


/**
 * Service that handles the logic of finishing a task.
 *
 * It must be set up with references before it can be used. See [setUp]{@link FinishTaskService#setUp} method for more information.
 */
@Injectable()
export class FinishTaskService {

    constructor(protected _log: LoggerService,
                protected _taskContentService: TaskContentService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService,
                protected _taskState: TaskRequestStateService,
                protected _taskDataService: TaskDataService) {
    }

    /**
     * @ignore
     * Performs a check and returns the Task from the injected {@link TaskContentService} instance
     */
    private get _task(): Task {
        const task = this._taskContentService.task;
        if (!task) {
            throw new Error('AssignTaskService cannot work without an initialized TaskContentService');
        }
        return task;
    }

    /**
     * Updates the task data to their current state from backend, checks the validity of the data and
     * sends a finish request to backend.
     *
     * Finish request is not sent if the task contains invalid data.
     *
     * If an update to the data is already in progress waits for it's successful completion and sends the finish request after.
     *
     * @param afterAction if finish request completes successfully `true` will be emitted into this Subject,
     * otherwise `false` will be emitted
     */
    public validateDataAndFinish(afterAction = new Subject<boolean>()): void {
        const after = new Subject<boolean>();
        if (this._task.dataSize <= 0) {
            after.subscribe(() => {
                if (this._task.dataSize <= 0 || this._taskContentService.validateTaskData()) {
                    this.sendFinishTaskRequest(afterAction);
                }
                after.complete();
            });
            this._taskDataService.initializeTaskDataFields(after);
        } else if (this._taskContentService.validateTaskData()) {
            after.subscribe(boolean => {
                if (boolean) {
                    if (this._taskState.isUpdating) {
                        this._taskDataService.updateSuccess$.pipe(take(1)).subscribe(bool => {
                            if (bool) {
                                this.sendFinishTaskRequest(afterAction);
                            }
                        });
                    } else {
                        this.sendFinishTaskRequest(afterAction);
                    }
                }
                after.complete();
            });
            this._taskDataService.updateTaskDataFields(after);
        }
    }

    /**
     * Sends the finish request to backend and notifies the user about the outcome of the operation via a snack bar message.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the finish request.
     * @param afterAction if finish request completes successfully `true` will be emitted into this Subject,
     * otherwise `false` will be emitted
     */
    private sendFinishTaskRequest(afterAction: Subject<boolean>): void {
        if (this._taskState.isLoading) {
            return;
        }
        this._taskState.startLoading();
        this._taskResourceService.finishTask(this._task.stringId).subscribe(response => {
            this._taskState.stopLoading();
            if (response.success) {
                this._taskContentService.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, () => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.finishTask')}
             ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this._taskState.stopLoading();
            afterAction.next(false);
        });
    }
}
