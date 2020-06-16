import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';


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
                _taskContentService: TaskContentService) {
        super(_taskContentService);
    }

    /**
     * Performs the 'assign' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the assign operation.
     * @param afterAction if assign completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    public assign(afterAction = new Subject<boolean>()): void {
        if (this._taskState.isLoading) {
            return;
        }
        if (this._task.user) {
            afterAction.next(true);
            return;
        }
        this._taskState.startLoading();
        this._taskResourceService.assignTask(this._task.stringId).subscribe(response => {
            this._taskState.stopLoading();
            if (response.success) {
                this._taskContentService.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
             ${this._taskContentService.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this._log.debug(error);
            this._taskState.stopLoading();
            afterAction.next(false);
        });
    }
}
