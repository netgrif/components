import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    Filter,
    FilterType,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    TabbedCaseView,
    NAE_BASE_FILTER, AllowedNetsServiceFactory, AllowedNetsService, ViewIdService
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';
import {Subject} from 'rxjs';

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
