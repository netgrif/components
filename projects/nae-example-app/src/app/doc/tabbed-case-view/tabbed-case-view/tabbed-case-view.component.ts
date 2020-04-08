import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    TabbedCaseView,
    LoggerService,
    CaseViewService, PetriNetReference, PetriNetResourceService,
} from '@netgrif/application-engine';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [CaseViewService]
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    public allowedNets$: ReplaySubject<Array<PetriNetReference>>;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                petriNetResourceService: PetriNetResourceService) {
        super(caseViewService, loggerService, injectedTabData, '{}');
        this.allowedNets$ = new ReplaySubject<Array<PetriNetReference>>(1);
        petriNetResourceService.getAll().subscribe(result => {
            this.allowedNets$.next(result.petriNetReferences);
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
