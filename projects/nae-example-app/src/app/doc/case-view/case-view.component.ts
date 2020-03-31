import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    CaseResourceService,
    SideMenuService,
    HeaderComponent,
    AbstractCaseView,
    Case,
} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(_sideMenuService: SideMenuService,
                _caseResourceService: CaseResourceService) {
        super(_sideMenuService, _caseResourceService, '{}');
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }

}
