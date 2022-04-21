import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseViewService, InjectedTabData, LoggerService, NAE_TAB_DATA, Case, HeaderColumn} from '@netgrif/components-core';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

@Component({
    selector: 'nc-case-list-paginator',
    templateUrl: './case-list-paginator.component.html',
    styleUrls: ['./case-list-paginator.component.scss']
})
export class CaseListPaginatorComponent {

    length: number;
    pageSize = 20;
    pageIndex = 0;
    pageSizeOptions: number[] = [10, 20, 50];

    public cases$: Observable<Array<Case>>;
    public loading$: Observable<boolean>;
    private redirectCaseId: string;
    private unsubscribe$: Subject<void>;

    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Output() caseClick: EventEmitter<Case>;
    @Input() showCasePanelIcon = true;
    @Input() showDeleteMenu = false;
    @Input() textEllipsis = false;
    @Input() width: string;
    @Input() redirectEnabled = true;

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        this.cases$ = this._caseViewService.cases$.pipe(tap(() => {
            this.length = this._caseViewService.pagination.totalElements;
            this.pageIndex = this._caseViewService.pagination.number;
        }));
        this.unsubscribe$ = new Subject<void>();
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
        this.onRedirect();
    }


    onPageChanged(e) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this._caseViewService.nextPagePagination(this.pageSize, this.pageIndex);
    }

    public trackBy(i): any {
        return i;
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
