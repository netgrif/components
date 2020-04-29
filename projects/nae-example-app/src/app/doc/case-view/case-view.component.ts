import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractCaseView,
    Case,
    CaseParams,
    CaseViewService,
    ConfigurationService,
    FilterType,
    HeaderComponent,
    Net,
    ProcessService,
    SimpleFilter
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
    public allowedNets$: ReplaySubject<Array<Net>>;
    public params: CaseParams;

    constructor(caseViewService: CaseViewService, processService: ProcessService, configService: ConfigurationService) {
        super(caseViewService, new SimpleFilter('', FilterType.CASE, {}));
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
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
