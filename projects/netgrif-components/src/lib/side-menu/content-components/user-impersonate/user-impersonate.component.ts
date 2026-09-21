import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    NAE_SIDE_MENU_CONTROL,
    AbstractUserImpersonateComponent,
    SideMenuControl,
    LoggerService,
    CaseViewService,
    BaseFilter,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    SearchService,
    NAE_BASE_FILTER,
    NAE_DEFAULT_HEADERS,
    UserImpersonationConstants,
    UserImpersonateInjectionData
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../header/header.component';

function baseFilterFactory(sideMenuControl: SideMenuControl): BaseFilter {
    if (!sideMenuControl.data) {
        throw new Error('NewFilterCaseId was not provided in the side menu injection data');
    }
    const injectedData = sideMenuControl.data as UserImpersonateInjectionData;

    return {filter: injectedData.filter};
}

function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER]);
}

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-user-impersonate',
    templateUrl: './user-impersonate.component.html',
    styleUrls: ['./user-impersonate.component.scss'],
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
            useValue: [
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_IMPERSONATED}`,
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_ROLES}`,
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_AUTHS}`,
            ]}
    ]
})
export class UserImpersonateComponent extends AbstractUserImpersonateComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                log: LoggerService,
                caseViewService: CaseViewService) {
        super(sideMenuControl, caseViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}
