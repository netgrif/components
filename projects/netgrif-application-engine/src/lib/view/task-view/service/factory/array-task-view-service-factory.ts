import {Injectable} from '@angular/core';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../../../../search/search-service/search.service';
import {ProcessService} from '../../../../process/process.service';
import {TaskViewService} from '../task-view.service';
import {InjectedTabbedTaskViewData} from '../../models/injected-tabbed-task-view-data';
import {LoggerService} from '../../../../logger/services/logger.service';
import {UserComparatorService} from '../../../../user/services/user-comparator.service';
import {of} from 'rxjs';

/**
 * Convenience method that can be used as a factory if no `allowedNets` are necessary.
 * It has a dependency on this class, so the component must provide {@link ArrayTaskViewServiceFactory}.
 */
export function noNetsTaskViewServiceFactory(factory: ArrayTaskViewServiceFactory): TaskViewService {
    return factory.create([]);
}

/**
 * Convenience method that can be used as a factory for tabbed task views.
 * If no allowed nets are provided in the injected data
 * the function will create a {@link TaskViewService} instance with no allowed nets.
 * It has a dependency on this class and {@link NAE_TAB_DATA} injection token.
 */
export function tabbedTaskViewServiceFactory(factory: ArrayTaskViewServiceFactory, tabData: InjectedTabbedTaskViewData): TaskViewService {
    return factory.create(!!tabData.allowedNets ? tabData.allowedNets : [],
        tabData.initiallyOpenOneTask !== undefined ? of(!!tabData.initiallyOpenOneTask) : undefined);
}


/**
 * Utility Service that saves you from injecting a bunch of {@link TaskViewService} dependencies.
 * Simply provide this service in your task view and use it in your local {@link TaskViewService} factory
 * to create an instance for that view.
 *
 * If you have extended {@link TaskViewService} with your own functionality, you are encouraged to extend this service as well.
 *
 * This is one of available `TaskViewServiceFactory` implementations, see {@link ArrayTaskViewServiceFactory} for another one.
 *
 * This implementation is useful if you need to provide {@link TaskViewService}  without having to
 * define the view in the configuration file. Most notably if the view is created dynamically, for example in a {@link TabViewComponent}.
 *
 * This class also provides a convenience method to create task views, that don't have `allowedNets`, without the
 * need for local factory methods.
 */
@Injectable()
export class ArrayTaskViewServiceFactory {

    constructor(protected _taskResourceService: TaskResourceService,
                protected _userService: UserService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                protected _searchService: SearchService,
                protected _processService: ProcessService,
                protected _loggerService: LoggerService,
                protected _userComparator: UserComparatorService) {
    }

    /**
     * Creates an instance of {@link TaskViewService} without having to provide all the dependencies yourself.
     * @param allowedNetsIds identifiers of the allowed nets.
     * @param initiallyOpenOneTask initially open task if its only one in task list
     * @returns an instance of {@link TaskViewService} with the provided nets set as it's `allowedNets`.
     */
    public create(allowedNetsIds: Array<string>, initiallyOpenOneTask = of(true)): TaskViewService {
        return new TaskViewService(
            this._taskResourceService,
            this._userService,
            this._snackBarService,
            this._translate,
            this._searchService,
            this._loggerService,
            this._userComparator,
            this._processService.getNets(allowedNetsIds),
            initiallyOpenOneTask
        );
    }
}
