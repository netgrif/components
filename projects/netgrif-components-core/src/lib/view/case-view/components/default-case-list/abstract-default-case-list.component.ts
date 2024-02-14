import {Component, EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Case} from '../../../../resources/interface/case';
import {HeaderColumn} from '../../../../header/models/header-column';
import {CaseViewService} from '../../service/case-view-service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {TabbedVirtualScrollComponent} from '../../../../panel/abstract/tabbed-virtual-scroll.component';

@Component({
    selector: 'ncc-abstract-default-case-list',
    template: ''
})
export abstract class AbstractDefaultCaseListComponent extends TabbedVirtualScrollComponent implements OnDestroy {

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
    protected _unsubscribe$: Subject<void>;
    protected _unsub: Subscription;
    protected _canReload: boolean;

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(injectedTabData);
        this._unsubscribe$ = new Subject<void>();
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
        if (injectedTabData !== null) {
            this._unsub = injectedTabData.tabSelected$.pipe(
                filter(bool => bool)
            ).subscribe( () => {
                if (this._canReload) {
                    this._caseViewService.reload();
                } else {
                    this._canReload = true;
                }
            });
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.caseClick.complete();
        this._unsubscribe$.complete();
        if (this._unsub) {
            this._unsub.unsubscribe();
        }
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
            this.cases$.pipe(takeUntil(this._unsubscribe$)).subscribe(cases => {
                if (cases !== undefined && cases.length > 0) {
                    const _case = cases.find(c => c.stringId === this.redirectCaseId);
                    if (_case !== undefined) {
                        this.caseClick.emit(_case);
                        this._unsubscribe$.next();
                    }
                }
            });
        });
    }
}
