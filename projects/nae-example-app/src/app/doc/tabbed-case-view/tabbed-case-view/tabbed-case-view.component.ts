import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseResourceService,
    SideMenuService,
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    TabbedCaseView,
    LoggerService,
} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss']
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(sideMenuService: SideMenuService,
                caseResourceService: CaseResourceService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(sideMenuService, caseResourceService, loggerService, injectedTabData, '{}');
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
