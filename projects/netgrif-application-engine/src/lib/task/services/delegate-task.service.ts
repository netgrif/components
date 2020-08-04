import {Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {LoggerService} from '../../logger/services/logger.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskHandlingService} from './task-handling-service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {TaskOperations} from '../interfaces/task-operations';
import {UserListInjectedData} from '../../side-menu/content-components/user-assign/model/user-list-injected-data';
import {UserValue} from '../../data-fields/user-field/models/user-value';


/**
 * Service that handles the logic of delegating a task.
 */
@Injectable()
export class DelegateTaskService extends TaskHandlingService {

    constructor(protected _log: LoggerService,
                protected _sideMenuService: SideMenuService,
                protected _taskResourceService: TaskResourceService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService,
                protected _taskState: TaskRequestStateService,
                @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations,
                _taskContentService: TaskContentService) {
        super(_taskContentService);
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
        if (this._taskState.isLoading) {
            return;
        }
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM,
            {
                roles: undefined,
                value: new UserValue(
                    this._safeTask.user.id, this._safeTask.user.name, this._safeTask.user.surname, this._safeTask.user.email
                )
            } as UserListInjectedData).onClose.subscribe(event => {
            this._log.info('Sidemenu event:' + event);
            if (event.data !== undefined) {
                this._taskState.startLoading();

                this._taskResourceService.delegateTask(this._safeTask.stringId, event.data.id).subscribe(response => {
                    this._taskState.stopLoading();
                    if (response.success) {
                        this._taskContentService.removeStateData();
                        this.completeSuccess(afterAction);
                    } else if (response.error) {
                        this._snackBar.openErrorSnackBar(response.error);
                        afterAction.next(false);
                    }
                }, error => {
                    this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
                     ${this._task} ${this._translate.instant('tasks.snackbar.failed')}`);
                    this._taskState.stopLoading();
                    afterAction.next(false);
                });
            }
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
