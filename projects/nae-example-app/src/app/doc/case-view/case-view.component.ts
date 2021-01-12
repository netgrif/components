import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractCaseView,
    Case,
    CaseViewService,
    SearchChipService,
    SearchService,
    SimpleFilter,
    AllNetsCaseViewServiceFactory,
    OverflowService,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService, CategoryFactory, NAE_SEARCH_CATEGORIES, defaultCaseSearchCategoriesFactory
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const localCaseViewServiceFactory = (factory: AllNetsCaseViewServiceFactory) => {
    return factory.create();
};

const searchServiceFactory = () => {
    return new SearchService(SimpleFilter.emptyCaseFilter());
};

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [
        CategoryFactory,
        SearchChipService,
        AllNetsCaseViewServiceFactory,
        OverflowService,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [AllNetsCaseViewServiceFactory]},
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'case'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService, protected overflowService: OverflowService) {
        super(caseViewService, overflowService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
