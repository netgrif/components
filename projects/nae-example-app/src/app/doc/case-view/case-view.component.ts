import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractCaseView,
    Case,
    CaseResourceService,
    HeaderComponent,
    SideMenuService,
} from 'netgrif-application-engine';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    featuredFields$: BehaviorSubject<Array<string>>;

    constructor(_sideMenuService: SideMenuService,
                _caseResourceService: CaseResourceService) {
        super(_sideMenuService, _caseResourceService, '{}');
        this.featuredFields$ = new BehaviorSubject<Array<string>>(['number', 'text', 'boolean']);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }

}
