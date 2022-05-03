import {EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Case} from '../../../../resources/interface/case';
import {HeaderColumn} from '../../../../header/models/header-column';
import {CaseViewService} from '../../service/case-view-service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {TabbedVirtualScrollComponent} from '../../../../panel/abstract/tabbed-virtual-scroll.component';

export abstract class AbstractDefaultCaseList extends TabbedVirtualScrollComponent implements OnDestroy {

    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Output() caseClick: EventEmitter<Case>;
    @Input() showCasePanelIcon = true;
    @Input() showDeleteMenu = false;
    @Input() textEllipsis = false;
    @Input() width: string;
    @Input() redirectEnabled = true;

    public cases$: Observable<Array<Case>>;
    public loading$: Observable<boolean>;
    protected redirectCaseId: string;
    protected unsubscribe$: Subject<void>;

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(injectedTabData);
        this.unsubscribe$ = new Subject<void>();
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
    }

    ngOnDestroy(): void {
        this.caseClick.complete();
        this.unsubscribe$.complete();
    }

    public onCaseClick(case_: Case) {
        this.caseClick.emit(case_);
    }

    public onRedirect() {
        if (!this.redirectEnabled) {
            return;
        }

        this.route.queryParams.pipe(filter(pm => !!pm['caseId'])).subscribe(paramMap => {
            this.redirectCaseId = paramMap['caseId'];
            this.cases$.pipe(takeUntil(this.unsubscribe$)).subscribe(cases => {
                if (cases !== undefined && cases.length > 0) {
                    const _case = cases.find(c => c.stringId === this.redirectCaseId);
                    if (_case !== undefined) {
                        this.caseClick.emit(_case);
                        this.unsubscribe$.next();
                    }
                }
            });
        });
    }
}
