import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {ProcessService} from '../../../../process/process.service';
import {TaskViewService} from '../task-view.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TaskViewParams} from '../../models/task-view-params';

/**
 * Utility Service that saves you from injecting a bunch of {@link TaskViewService} dependencies.
 * Simply provide this service in your task view and use it in your local {@link TaskViewService} factory
 * to create an instance for that view.
 *
 * If you have extended {@link TaskViewService} with your own functionality, you are encouraged to extend this service as well.
 *
 * This is one of available `TaskViewServiceFactory` implementations, see {@link ArrayTaskViewServiceFactory} for another one.
 *
 * This implementation is useful if you need to provide {@link TaskViewService} and have a view with `allowedNets`
 * defined in your configuration.
 */
@Injectable()
export class ConfigTaskViewServiceFactory {

    constructor(protected _taskResourceService: TaskResourceService,
                protected _userService: UserService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                protected _searchService: SearchService,
                protected _configService: ConfigurationService,
                protected _processService: ProcessService,
                protected _log: LoggerService) {
    }

    /**
     * Creates an instance of {@link TaskViewService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the task view as specified in it's configuration. No leading backslash.
     * It is used to load [allowedNets]{@link SortableViewWithAllowedNets#_allowedNets$} from configuration.
     * @returns an instance of {@link TaskViewService} configured for view at the specified path.
     */
    public create(webViewPath: string): TaskViewService {
        const view = this._configService.getViewByPath(webViewPath);
        if (view && view.layout && view.layout.params) {
            const viewParams = view.layout.params as TaskViewParams;
            let nets = of([]);
            if (viewParams.allowedNets !== undefined) {
                nets = this._processService.getNets(viewParams.allowedNets);
            } else {
                this._log.warn(`No 'allowedNets' provided for task view with path '${webViewPath}'`);
            }
            return new TaskViewService(
                this._taskResourceService,
                this._userService,
                this._snackBarService,
                this._translate,
                this._searchService,
                this._log,
                nets
            );
        } else {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
    }
}
