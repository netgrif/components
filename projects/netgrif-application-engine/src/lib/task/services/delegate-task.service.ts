import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {LoggerService} from '../../logger/services/logger.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {Task} from '../../resources/interface/task';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';


/**
 * Service that handles the logic of delegating a task.
 *
 * It must be set up with references before it can be used. See [setUp]{@link DelegateTaskService#setUp} method for more information.
 */
@Injectable()
export class DelegateTaskService {

    private _referencesSet = false;
    protected _loading: LoadingEmitter;
    protected _task: Task;

    constructor(protected _log: LoggerService,
                protected _sideMenuService: SideMenuService,
                protected _taskResourceService: TaskResourceService,
                protected _taskContentService: TaskContentService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
        this._taskContentService.task$.subscribe(task => {
            this._task = task;
        });
    }

    /**
     * Sets up the references that are necessary for this Service to function properly.
     * @param loadingIndicator reference to the loading indicator
     */
    public setUp(loadingIndicator: LoadingEmitter): void {
        if (this._referencesSet) {
            this._log.error('DelegateTaskService was already set up! You cannot call \'setUp\' on it again!');
            return;
        }

        this._referencesSet = true;
        this._loading = loadingIndicator;
    }

    /**
     * Performs the 'delegate' operation on the task held by {@link TaskContentService}.
     *
     * Doesn't send any requests if the loading indicator is in it's active state.
     * Otherwise sets the indicator to the active state and disables it once the request response is received.
     *
     * The argument can be used to chain operations together,
     * or to execute code conditionally based on the success state of the delegate operation.
     * @param afterAction if delegate completes successfully `true` will be emitted into this Subject, otherwise `false` will be emitted
     */
    delegate(afterAction = new Subject<boolean>()) {
        if (!this._referencesSet) {
            this._log.error('DelegateTaskService was not yet set up! You must call \'setUp\' before calling other methods of this class!');
            return;
        }

        if (this._loading.isActive) {
            return;
        }
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM).onClose.subscribe(event => {
            console.log(event);
            if (event.data !== undefined) {
                this._loading.on();

                this._taskResourceService.delegateTask(this._task.stringId, event.data.id).subscribe(response => {
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
                     ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
                    this._loading.off();
                    afterAction.next(false);
                });
            }
        });

    }
}
