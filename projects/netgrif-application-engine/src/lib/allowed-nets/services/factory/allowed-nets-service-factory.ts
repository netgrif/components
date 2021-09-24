import {Injectable} from '@angular/core';
import {ProcessService} from '../../../process/process.service';
import {AllowedNetsService} from '../allowed-nets.service';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {CaseViewParams} from '../../../view/case-view/models/case-view-params';
import {LoggerService} from '../../../logger/services/logger.service';
import {TaskViewParams} from '../../../view/task-view/models/task-view-params';
import {InjectedTabbedTaskViewData} from '../../../view/task-view/models/injected-tabbed-task-view-data';
import {Case} from '../../../resources/interface/case';
import {getImmediateData} from '../../../utility/get-immediate-data';
import {UserFilterConstants} from '../../../filter/models/user-filter-constants';
import {DataGroup} from '../../../resources/public-api';
import {getFieldFromDataGroups} from '../../../utility/get-field';
import {FilterField} from '../../../data-fields/filter-field/models/filter-field';
import {BaseAllowedNetsService} from '../base-allowed-nets.service';


/**
 * Convenience method that can be used as an allowed nets factory for tabbed task views.
 * If no allowed nets are provided in the injected data then an {@link AllowedNetsService} with no allowed nets is created.
 * It has a dependency on this class and {@link NAE_TAB_DATA} injection token.
 */
export function tabbedAllowedNetsServiceFactory(factory: AllowedNetsServiceFactory,
                                                tabData: InjectedTabbedTaskViewData): AllowedNetsService {
    return factory.createFromArray(tabData?.allowedNets ?? []);
}

/**
 * Convenience method that can be used as an allowed nets factory for views that are loaded from filter process instances.
 * It has a dependency on this class and {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token.
 */
export function navigationItemTaskAllowedNetsServiceFactory(factory: AllowedNetsServiceFactory,
                                                            baseAllowedNets: BaseAllowedNetsService,
                                                            navigationItemTaskData: Array<DataGroup>): AllowedNetsService {
    const filterField = getFieldFromDataGroups(navigationItemTaskData, UserFilterConstants.FILTER_FIELD_ID, true) as FilterField;

    if (filterField === undefined) {
        throw new Error(`Provided navigation item task data does not contain a filter field with ID '${UserFilterConstants.FILTER_FIELD_ID
        }'! Allowed nets cannot be generated from it!`);
    }

    const nets = [...filterField.allowedNets];

    if (filterField.filterMetadata.inheritAllowedNets) {
        nets.push(...baseAllowedNets.allowedNets);
    }

    return factory.createFromArray(nets);
}

/**
 * Simplifies the creation of {@link AllowedNetsService} instances
 */
@Injectable({
    providedIn: 'root'
})
export class AllowedNetsServiceFactory {

    constructor(protected _processService: ProcessService,
                protected _petriNetResource: PetriNetResourceService,
                protected _configService: ConfigurationService,
                protected _log: LoggerService) {
    }

    /**
     * Creates an instance of {@link AllowedNetsService} without having to provide all the dependencies yourself.
     * @returns an instance of {@link AllowedNetsService} with all nets set as the `allowedNets`
     */
    public createWithAllNets(): AllowedNetsService {
        return new AllowedNetsService(
            this._petriNetResource.getAll().pipe(
                switchMap(nets => {
                    if (nets && Array.isArray(nets)) {
                        return of(nets.map(n => n.identifier));
                    } else {
                        return of([]);
                    }
                })
            ),
            this._processService
        );
    }

    /**
     * Creates an instance of {@link AllowedNetsService} without having to provide all the dependencies yourself.
     * @param allowedNetsIdentifiers identifiers of the allowed nets
     */
    public createFromArray(allowedNetsIdentifiers: Array<string>): AllowedNetsService {
        return new AllowedNetsService(
            of(allowedNetsIdentifiers),
            this._processService
        );
    }

    /**
     * Creates an instance of {@link AllowedNetsService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the view as specified in its configuration. No leading backslash.
     * Allowed nets are loaded from the configuration of the view.
     */
    public createFromConfig(webViewPath: string): AllowedNetsService {
        const view = this._configService.getViewByPath(webViewPath);
        if (view?.layout?.params === undefined) {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
        const viewParams = view.layout.params as CaseViewParams | TaskViewParams;
        if (viewParams.allowedNets === undefined) {
            this._log.warn(`No 'allowedNets' provided for view with webPath '${webViewPath}'`);
        }
        return new AllowedNetsService(
            of(viewParams.allowedNets ?? []),
            this._processService
        );
    }

    /**
     * Creates an instance of {@link AllowedNetsService} without having to provide all the dependencies yourself.
     * @param netIdentifiers$ observable containing the identifiers of the allowed nets.
     * When a new value is emitted the allowed nets will be updated.
     */
    public createFromObservable(netIdentifiers$: Observable<Array<string>>): AllowedNetsService {
        return new AllowedNetsService(
            netIdentifiers$,
            this._processService
        );
    }

    /**
     * Creates an instance of {@link AllowedNetsService} without having to provide all the dependencies yourself.
     * @param filterCase a filter process instance
     * Allowed nets are set from filter process immediate data
     */
    public createFromFilterCase(filterCase: Case): AllowedNetsService {
        const filterData = getImmediateData(filterCase, UserFilterConstants.FILTER_FIELD_ID);
        if (filterData === undefined) {
            throw new Error(`Cannot get filter from case '${filterCase.title}' with id '${filterCase.stringId}'`);
        }
        return new AllowedNetsService(
            of(filterData.allowedNets),
            this._processService
        );
    }
}
