import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    AbstractCaseView,
    CaseViewService,
    Case,
    ProcessService,
    Net,
} from '@netgrif/application-engine';
import {ReplaySubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [CaseViewService],
})
export class CaseViewComponent extends AbstractCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    public allowedNets$: ReplaySubject<Array<Net>>;

    constructor(caseViewService: CaseViewService, processService: ProcessService) {
        super(caseViewService, '{}');
        this.allowedNets$ = new ReplaySubject<Array<Net>>(1);
        processService.loadNets().pipe(catchError( err => throwError(err))).subscribe(result => {
            this.allowedNets$.next(result);
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
