import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseParams,
    CaseViewService,
    ConfigurationService,
    FilterType,
    HeaderComponent,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_TAB_DATA,
    Net,
    ProcessService,
    SimpleFilter,
    TabbedCaseView,
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
    public allowedNets$: ReplaySubject<Array<Net>>;
    public params: CaseParams;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                processService: ProcessService,
                configService: ConfigurationService) {
        super(caseViewService, loggerService, injectedTabData, new SimpleFilter('', FilterType.CASE, {}));
        this.allowedNets$ = new ReplaySubject<Array<Net>>(1);
        // TODO 16.4. 2020 initialize allowedNets by filter
        const view = configService.getViewByPath('<%= webPath %>');
        if (view && view.layout && view.layout.params) {
            this.params = view.layout.params as CaseParams;
            if (this.params.allowedNets !== undefined) {
                const nets = [];
                this.params.allowedNets.forEach(netId => {
                    processService.getNet(netId).subscribe(net => {
                        nets.push(net);
                        if (nets.length === this.params.allowedNets.length) {
                            this.allowedNets$.next(nets);
                        }
                    });
                });
            }
        }
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

}
