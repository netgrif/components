import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractCaseView,
    Case,
    CaseViewService,
    SearchChipService,
    SearchService,
    SimpleFilter,
    AllNetsCaseViewServiceFactory
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
        SearchChipService,
        AllNetsCaseViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [AllNetsCaseViewServiceFactory]},
    ],
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService) {
        super(caseViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
