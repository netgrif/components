import {Component, Inject} from '@angular/core';
import {
    AbstractSaveFilterComponent,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    UserFiltersService,
    LoggerService,
    TaskViewService,
    SearchService,
    NAE_BASE_FILTER,
    SimpleFilter,
    SaveFilterInjectionData,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    UserFilterConstants,
    BaseFilter
} from '@netgrif/application-engine';

export function baseFilterFactory(sideMenuControl: SideMenuControl): BaseFilter {
    if (!sideMenuControl.data) {
        throw new Error('NewFilterCaseId was not provided in the sidemenu injectio data');
    }
    const injectedData = sideMenuControl.data as SaveFilterInjectionData;

    return {
        filter: SimpleFilter.fromTaskQuery({
            case: {id: injectedData.newFilterCaseId},
            transitionId: UserFilterConstants.NEW_FILTER_TRANSITION_ID
        })
    };
}

export function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserFilterConstants.FILTER_NET_IDENTIFIER]);
}

@Component({
    selector: 'nc-save-filter',
    templateUrl: './save-filter.component.html',
    styleUrls: ['./save-filter.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_SIDE_MENU_CONTROL]
        },
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
    ]
})
export class SaveFilterComponent extends AbstractSaveFilterComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                userFilterService: UserFiltersService,
                log: LoggerService,
                taskViewService: TaskViewService) {
        super(sideMenuControl, userFilterService, log, taskViewService);
    }

}
