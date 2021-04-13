import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    FilterType,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    TabbedCaseView,
    ViewIdService,
    Filter,
    NAE_NEW_CASE_CONFIGURATION,
    InjectedTabData,
    NAE_BASE_FILTER, AllowedNetsServiceFactory, AllowedNetsService,
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';
import {Subject} from 'rxjs';

interface ExampleInjectedData extends InjectedTabData {
    exampleUseCache: boolean;
}

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    const filter = new Subject<Filter>();
    setTimeout(() => {
        filter.next(SimpleFilter.emptyCaseFilter());
    }, 1000);
    return {
        filter: filter.asObservable(),
        filterType: FilterType.CASE
    };
};

const newCaseConfigFactory = (injectedTabData: ExampleInjectedData) => {
    return {useCachedProcesses: injectedTabData.exampleUseCache};
};

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        ViewIdService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
        {provide: NAE_NEW_CASE_CONFIGURATION, useFactory: newCaseConfigFactory, deps: [NAE_TAB_DATA]}
    ]
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData);
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
