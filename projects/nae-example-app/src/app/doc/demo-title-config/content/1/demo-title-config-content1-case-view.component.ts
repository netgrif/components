import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CategoryFactory,
    CaseViewServiceFactory,
    defaultCaseSearchCategoriesFactory,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    TabbedCaseView,
    ViewIdService,
} from 'netgrif-application-engine';
import {HeaderComponent} from 'netgrif-components';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.createFromConfig('demo-title-config');
};

const searchServiceFactory = () => {
    return new SearchService(SimpleFilter.fromCaseQuery({
        process: {
            identifier: 'all_data'
        }
    }));
};

@Component({
    selector: 'nae-app-demo-title-config-content1-case-view',
    templateUrl: './demo-title-config-content1-case-view.component.html',
    styleUrls: ['./demo-title-config-content1-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class DemoTitleConfigContent1CaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, {
            enableCaseTitle: false,
            isCaseTitleRequired: false
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
