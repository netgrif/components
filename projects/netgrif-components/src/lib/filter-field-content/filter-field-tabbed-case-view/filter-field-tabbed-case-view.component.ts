import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    AbstractTabbedCaseViewComponent, AllowedNetsService, AllowedNetsServiceFactory,
    CaseViewService, CategoryFactory, defaultCaseSearchCategoriesFactory,
    InjectedTabbedCaseViewData,
    LoggerService, NAE_BASE_FILTER, NAE_NEW_CASE_CONFIGURATION, NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA, OverflowService, SearchService, UserFilterConstants, ViewIdService
} from '@netgrif/components-core';
import { HeaderComponent } from '../../header/header.component';

export const newCaseConfigFactory = () => {
    return {useCachedProcesses: false};
};

export function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserFilterConstants.FILTER_NET_IDENTIFIER]);
}
@Component({
  selector: 'nc-filter-field-tabbed-case-view',
  templateUrl: './filter-field-tabbed-case-view.component.html',
  styleUrls: ['./filter-field-tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
        {provide: NAE_NEW_CASE_CONFIGURATION, useFactory: newCaseConfigFactory, deps: [NAE_TAB_DATA]}
    ]
})
export class FilterFieldTabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, undefined, undefined, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
