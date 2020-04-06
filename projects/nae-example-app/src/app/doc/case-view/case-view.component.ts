import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    AbstractCaseView,
    CaseViewService,
    Case,
} from '@netgrif/application-engine';
@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [CaseViewService],
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {
    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    constructor(caseViewService: CaseViewService) {
        super(caseViewService, '{}');
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
