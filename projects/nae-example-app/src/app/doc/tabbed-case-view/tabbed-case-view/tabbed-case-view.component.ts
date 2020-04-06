import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    TabbedCaseView,
    LoggerService,
    CaseViewService,
} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [CaseViewService]
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, '{}');
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
