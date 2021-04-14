import {Component, Inject} from '@angular/core';
import {
    NAE_SIDE_MENU_CONTROL,
    AbstractLoadFilterComponent,
    SideMenuControl,
    LoggerService,
    CaseViewService,
    BaseFilter,
    LoadFilterInjectionData,
    UserFilterConstants,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    SearchService,
    NAE_BASE_FILTER
} from '@netgrif/application-engine';

export function baseFilterFactory(sideMenuControl: SideMenuControl): BaseFilter {
    if (!sideMenuControl.data) {
        throw new Error('NewFilterCaseId was not provided in the sidemenu injectio data');
    }
    const injectedData = sideMenuControl.data as LoadFilterInjectionData;

    return {filter: injectedData.filter};
}

export function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserFilterConstants.FILTER_NET_IDENTIFIER]);
}

@Component({
    selector: 'nc-load-filter',
    templateUrl: './load-filter.component.html',
    styleUrls: ['./load-filter.component.scss'],
    providers: [
        CaseViewService,
        SearchService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
    ]
})
export class LoadFilterComponent extends AbstractLoadFilterComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                log: LoggerService,
                caseViewService: CaseViewService) {
        super(sideMenuControl, log, caseViewService);
    }
}
