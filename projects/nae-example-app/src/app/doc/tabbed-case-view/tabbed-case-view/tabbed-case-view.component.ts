import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseResourceService,
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    SideMenuService,
    TabbedCaseView,
} from 'netgrif-application-engine';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss']
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    featuredFields$: BehaviorSubject<Array<string>>;

    constructor(_sideMenuService: SideMenuService,
                _caseResourceService: CaseResourceService,
                @Inject(NAE_TAB_DATA) _injectedTabData: InjectedTabbedCaseViewData) {
        super(_sideMenuService, _caseResourceService, _injectedTabData, '{}');
        // TODO featuredFields from header
        this.featuredFields$ = new BehaviorSubject<Array<string>>(['number', 'text', 'boolean']);
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
