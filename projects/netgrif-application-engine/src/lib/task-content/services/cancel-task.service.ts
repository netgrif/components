import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {Task} from '../../resources/interface/task';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from './task-content.service';
import {TaskEventService} from './task-event.service';
import {UserService} from '../../user/services/user.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';

/**
 * Service that handles the logic of canceling a task.
 *
 * It must be set up with references before it can be used. See [setUp]{@link CancelTaskService#setUp} method for more information.
 */
@Injectable()
export class CancelTaskService {

    private _referencesSet = false;
    protected _loading: LoadingEmitter;
    protected _task: Task;

    constructor(protected _log: LoggerService,
                protected _taskContentService: TaskContentService,
                protected _taskEventService: TaskEventService,
                protected _userService: UserService,
                protected _taskResourceService: TaskResourceService,
                protected _translate: TranslateService,
                protected _snackBar: SnackBarService) {
        this._taskContentService.task$.subscribe(task => {
            this._task = task;
        });
    }

    /**
     * Sets up the references that are necessary for this Service to function properly.
     * @param loadingRef reference to the loading indicator of the parent Service/Component that handles the rendering of a single task
     */
    public setUp(loadingRef: LoadingEmitter): void {
        if (this._referencesSet) {
            this._log.error('CancelTaskService was already set up! You cannot call \'setUp\' on it again!');
            return;
        }

        this._referencesSet = true;
        this._loading = loadingRef;
    }

    /**
     * Performs the 'cancel' operation on the task held by {@link TaskContentService}.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the cancel operation.
     * @param afterAction if cancel completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    cancel(afterAction = new Subject<boolean>()) {
        if (!this._referencesSet) {
            this._log.error('CancelTaskService was not yet set up! You must call \'setUp\' before calling other methods of this class!');
            return;
        }

        if (this._loading.isActive) {
            return;
        }
        if (!this._task.user
            || (
                (this._task.user.email !== this._userService.user.email)
                && !this._taskEventService.canDo('cancel')
            )) {
            afterAction.next(false);
            return;
        }
        this._loading.on();
        this._taskResourceService.cancelTask(this._task.stringId).subscribe(response => {
            this._loading.off();
            if (response.success) {
                this._taskContentService.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, () => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.cancelTask')}
             ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this._loading.off();
            afterAction.next(false);
        });
    }
}
