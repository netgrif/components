import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CaseViewServiceFactory,
    FilterType,
    HeaderComponent,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    TabbedCaseView,
} from '@netgrif/application-engine';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.create('case');
};

const searchServiceFactory = () => {
    return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
};

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [
        CaseViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]},
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
