import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    HeaderComponent,
    InjectedTabbedCaseViewData,
    NAE_TAB_DATA,
    TabbedCaseView,
    LoggerService,
    CaseViewService,
    ProcessService,
    Net,
} from '@netgrif/application-engine';
import {ReplaySubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [CaseViewService]
})
export class TabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    public allowedNets$: ReplaySubject<Array<Net>>;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                processService: ProcessService) {
        super(caseViewService, loggerService, injectedTabData, '{}');
        this.allowedNets$ = new ReplaySubject<Array<Net>>(1);
        processService.loadNets().pipe(catchError( err => throwError(err))).subscribe(result => {
            this.allowedNets$.next(result);
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
