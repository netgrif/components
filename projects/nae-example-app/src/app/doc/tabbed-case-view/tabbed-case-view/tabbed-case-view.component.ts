import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    TabbedCaseView,
    SearchChipService,
    AllNetsCaseViewServiceFactory, NAE_SEARCH_CATEGORIES, defaultCaseSearchCategoriesFactory, CategoryFactory
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const localCaseViewServiceFactory = (factory: AllNetsCaseViewServiceFactory) => {
    return factory.create();
};

const searchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyCaseFilter());
};

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        SearchChipService,
        AllNetsCaseViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [AllNetsCaseViewServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
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
