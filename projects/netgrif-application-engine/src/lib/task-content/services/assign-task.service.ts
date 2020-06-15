import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from './task-content.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {Task} from '../../resources/interface/task';


/**
 * Service that handles the logic of assigning a task.
 *
 * It must be set up with references before it can be used. See [setUp]{@link AssignTaskService#setUp} method for more information.
 */
@Injectable()
export class AssignTaskService {

    private _referencesSet = false;
    protected _loading: LoadingEmitter;
    protected _task: Task;

    constructor(protected _log: LoggerService,
                protected _taskContentService: TaskContentService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
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
            this._log.error('AssignTaskService was already set up! You cannot call \'setUp\' on it again!');
            return;
        }

        this._referencesSet = true;
        this._loading = loadingRef;
    }

    /**
     * Performs the 'assign' operation on the task held by {@link TaskContentService}.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the assign operation.
     * @param afterAction if assign completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    public assign(afterAction = new Subject<boolean>()): void {
        if (!this._referencesSet) {
            this._log.error('AssignTaskService was not yet set up! You must call \'setUp\' before calling another method!');
            return;
        }

        if (this._loading.isActive) {
            return;
        }
        if (this._task.user) {
            afterAction.next(true);
            return;
        }
        this._loading.on();
        this._taskResourceService.assignTask(this._task.stringId).subscribe(response => {
            this._loading.off();
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
            this._loading.off();
            afterAction.next(false);
        });
    }

}
