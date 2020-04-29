import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractCaseView,
    Case,
    CaseViewService,
    CaseViewServiceFactory,
    FilterType,
    HeaderComponent,
    SearchService,
    SimpleFilter
} from '@netgrif/application-engine';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.create('case');
};

const searchServiceFactory = () => {
    // TODO load/use base filter somehow
    return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
};

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [
        CaseViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]},
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
