import {
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import {CaseViewService} from '../../service/case-view-service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable} from 'rxjs';
import {Case} from '../../../../resources/interface/case';
import {HeaderColumn} from '../../../../header/models/header-column';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TabbedVirtualScrollComponent} from '../../../../panel/abstract/tabbed-virtual-scroll.component';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';

export abstract class AbstractCaseListComponent extends TabbedVirtualScrollComponent implements OnDestroy {

    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Output() caseClick: EventEmitter<Case>;
    @Input() showCasePanelIcon = true;
    @Input() showDeleteMenu = false;
    @Input() textEllipsis = false;
    @Input() width: string;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
    public cases$: Observable<Array<Case>>;
    public loading$: Observable<boolean>;

    protected constructor(protected _caseViewService: CaseViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        super(injectedTabData);
        this.cases$ = this._caseViewService.cases$;
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.caseClick.complete();
    }

    public trackBy(i): any {
        return i;
    }

    public get loadedDataSize(): number {
        return this.viewport && this.viewport.getDataLength() ? this.viewport.getDataLength() : 0;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._caseViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    public onCaseClick(case_: Case) {
        this.caseClick.emit(case_);
    }

}
