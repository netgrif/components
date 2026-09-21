import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
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
    NAE_BASE_FILTER,
    NAE_DEFAULT_HEADERS
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../header/header.component';

export function baseFilterFactory(sideMenuControl: SideMenuControl): BaseFilter {
    if (!sideMenuControl.data) {
        throw new Error('NewFilterCaseId was not provided in the side menu injection data');
    }
    const injectedData = sideMenuControl.data as LoadFilterInjectionData;

    return {filter: injectedData.filter};
}

export function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserFilterConstants.FILTER_NET_IDENTIFIER]);
}

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-load-filter',
    templateUrl: './load-filter.component.html',
    styleUrls: ['./load-filter.component.scss'],
    providers: [
        CaseViewService,
        SearchService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_SIDE_MENU_CONTROL]},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {   provide: NAE_DEFAULT_HEADERS,
            useValue: ['meta-title', `${UserFilterConstants.FILTER_NET_IDENTIFIER}-${UserFilterConstants.FILTER_FIELD_ID}`]}
    ]
})
export class LoadFilterComponent extends AbstractLoadFilterComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                log: LoggerService,
                caseViewService: CaseViewService) {
        super(sideMenuControl, log, caseViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}
