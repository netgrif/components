import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseResourceService,
    SideMenuService,
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    TabbedCaseView,
} from 'netgrif-application-engine';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss']
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(_sideMenuService: SideMenuService,
                _caseResourceService: CaseResourceService,
                @Inject(NAE_TAB_DATA) _injectedTabData: InjectedTabbedCaseViewData) {
        super(_sideMenuService, _caseResourceService, _injectedTabData, '{}');
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
