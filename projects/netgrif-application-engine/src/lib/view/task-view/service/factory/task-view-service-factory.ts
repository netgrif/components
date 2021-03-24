import {Inject, Injectable, Optional} from '@angular/core';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../../../../search/search-service/search.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {ProcessService} from '../../../../process/process.service';
import {UserComparatorService} from '../../../../user/services/user-comparator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_PREFERRED_TASK_ENDPOINT} from '../../models/injection-token-task-endpoint';
import {TaskEndpoint} from '../../models/task-endpoint';
import {Observable, of} from 'rxjs';
import {TaskViewService} from '../task-view.service';
import {TaskViewParams} from '../../models/task-view-params';
import {switchMap} from 'rxjs/operators';
import {PetriNetResourceService} from '../../../../resources/engine-endpoint/petri-net-resource.service';
import {Net} from '../../../../process/net';
import {InjectedTabbedTaskViewData} from '../../models/injected-tabbed-task-view-data';

/**
 * Convenience method that can be used as a factory for tabbed task views.
 * If no allowed nets are provided in the injected data
 * the function will create a {@link TaskViewService} instance with no allowed nets.
 * It has a dependency on this class and {@link NAE_TAB_DATA} injection token.
 */
export function tabbedTaskViewServiceFactory(factory: TaskViewServiceFactory, tabData: InjectedTabbedTaskViewData): TaskViewService {
    return factory.createFromArray(!!tabData.allowedNets ? tabData.allowedNets : [],
        tabData.initiallyOpenOneTask !== undefined ? of(!!tabData.initiallyOpenOneTask) : undefined);
}

@Injectable()
export class TaskViewServiceFactory {

    constructor(protected _taskResourceService: TaskResourceService,
                protected _userService: UserService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                protected _searchService: SearchService,
                protected _configService: ConfigurationService,
                protected _processService: ProcessService,
                protected _petriNetResource: PetriNetResourceService,
                protected _userComparator: UserComparatorService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_PREFERRED_TASK_ENDPOINT) protected _preferredEndpoint: TaskEndpoint) {
    }

    /**
     * Creates an instance of {@link TaskViewService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the task view as specified in it's configuration. No leading backslash.
     * It is used to load [allowedNets]{@link SortableViewWithAllowedNets#_allowedNets$} from configuration.
     * @param initiallyOpenOneTask initially open task if its only one in task list
     * @param closeTaskTabOnNoTasks allows to close tab after finish , if there is no tasks
     * @returns an instance of {@link TaskViewService} configured for view at the specified path.
     */
    public createFromConfig(webViewPath: string, initiallyOpenOneTask = of(true), closeTaskTabOnNoTasks = of(true)): TaskViewService {
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
                this._userComparator,
                this._preferredEndpoint !== null ? this._preferredEndpoint : undefined,
                nets,
                initiallyOpenOneTask,
                closeTaskTabOnNoTasks
            );
        } else {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
    }

    /**
     * Creates an instance of {@link TaskViewService} without having to provide all the dependencies yourself.
     * @param allowedNetsIds identifiers of the allowed nets.
     * @param initiallyOpenOneTask initially open task if its only one in task list
     * @param closeTaskTabOnNoTasks allows to close tab after finish , if there is no tasks
     * @returns an instance of {@link TaskViewService} with the provided nets set as it's `allowedNets`.
     */
    public createFromArray(allowedNetsIds: Array<string>, initiallyOpenOneTask = of(true),
                           closeTaskTabOnNoTasks = of(true)): TaskViewService {
        return new TaskViewService(
            this._taskResourceService,
            this._userService,
            this._snackBarService,
            this._translate,
            this._searchService,
            this._log,
            this._userComparator,
            this._preferredEndpoint !== null ? this._preferredEndpoint : undefined,
            this._processService.getNets(allowedNetsIds),
            initiallyOpenOneTask,
            closeTaskTabOnNoTasks
        );
    }

    public createWithAllNets(initiallyOpenOneTask = of(true), closeTaskTabOnNoTasks = of(true)): TaskViewService {
        return new TaskViewService(
            this._taskResourceService,
            this._userService,
            this._snackBarService,
            this._translate,
            this._searchService,
            this._log,
            this._userComparator,
            this._preferredEndpoint !== null ? this._preferredEndpoint : undefined,
            this._petriNetResource.getAll().pipe(
                switchMap(nets => {
                    if (nets && Array.isArray(nets)) {
                        return this._processService.getNets(nets.map(n => n.identifier));
                    } else {
                        return of([]);
                    }
                })
            ),
            initiallyOpenOneTask,
            closeTaskTabOnNoTasks
        );
    }

    public createFromObservable(nets: Observable<Array<Net>>, initiallyOpenOneTask = of(true),
                                closeTaskTabOnNoTasks = of(true)): TaskViewService {
        return new TaskViewService(
            this._taskResourceService,
            this._userService,
            this._snackBarService,
            this._translate,
            this._searchService,
            this._log,
            this._userComparator,
            this._preferredEndpoint !== null ? this._preferredEndpoint : undefined,
            nets,
            initiallyOpenOneTask,
            closeTaskTabOnNoTasks
        );
    }
}
