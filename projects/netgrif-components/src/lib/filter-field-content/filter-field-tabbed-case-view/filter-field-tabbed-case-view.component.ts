import { AfterViewInit, Component, Inject, Optional, ViewChild } from '@angular/core';
import {
    AbstractTabbedCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CaseViewService,
    CategoryFactory,
    CategoryResolverService,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    NAE_NEW_CASE_CONFIGURATION, NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA, NewCaseCreationConfigurationData,
    OverflowService,
    SearchService,
    ViewIdService
} from '@netgrif/components-core';
import { HeaderComponent } from '../../header/header.component';
import { searchCategoryConverter } from '../../search/search-component/search.component';

export const newCaseConfigFactory = () => {
    return {useCachedProcesses: false};
};
export function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createWithAllNets();
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
        {provide: NAE_SEARCH_CATEGORIES, useFactory: searchCategoryConverter, deps: [CategoryResolverService, NAE_TAB_DATA, NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES]},
        {provide: NAE_NEW_CASE_CONFIGURATION, useFactory: newCaseConfigFactory, deps: [NAE_TAB_DATA]}
    ]
})
export class FilterFieldTabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                @Optional() @Inject(NAE_NEW_CASE_CREATION_CONFIGURATION_DATA) protected _newCaseCreationConfig: NewCaseCreationConfigurationData = {
                    enableCaseTitle: true,
                    isCaseTitleRequired: true}) {
        super(caseViewService, loggerService, injectedTabData, undefined, undefined, undefined, _newCaseCreationConfig);
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
