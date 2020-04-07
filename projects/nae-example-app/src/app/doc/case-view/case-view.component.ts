import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    AbstractCaseView,
    CaseViewService,
    Case,
    PetriNetResourceService,
    PetriNetReference,
} from '@netgrif/application-engine';
import {ReplaySubject} from 'rxjs';



@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [CaseViewService],
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    public allowedNets$: ReplaySubject<Array<PetriNetReference>>;

    constructor(caseViewService: CaseViewService, petriNetResourceService: PetriNetResourceService) {
        super(caseViewService, '{}');
        this.allowedNets$ = new ReplaySubject<Array<PetriNetReference>>(1);
        petriNetResourceService.getAll().subscribe(result => {
            this.allowedNets$.next(result.petriNetReferences);
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
