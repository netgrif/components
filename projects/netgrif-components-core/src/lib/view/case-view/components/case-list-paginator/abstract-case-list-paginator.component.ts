import {Component, Inject, Input, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Case} from '../../../../resources/interface/case';
import {CaseViewService} from '../../service/case-view-service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {AbstractDefaultCaseListComponent} from '../default-case-list/abstract-default-case-list.component';

@Component({
    selector: 'ncc-abstract-case-list-paginator',
    template: ''
})
export abstract class AbstractCaseListPaginatorComponent extends AbstractDefaultCaseListComponent {

    public length: number;
    public pageSize = 20;
    public pageIndex = 0;
    public pageSizeOptions: number[] = [10, 20, 50, 100];
    @Input() public approval: boolean;
    @Input() public disabled: boolean;

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, route);
        this._caseViewService.nextPagePagination(this.pageSize, this.pageIndex);
        this._caseViewService.paginationView = true;
        this.cases$ = this._caseViewService.cases$.pipe(tap(() => {
            this.length = this._caseViewService.pagination.totalElements;
            this.pageIndex = this._caseViewService.pagination.number;
        }));
        this.onRedirect();
    }

    public onPageChanged(e) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this._caseViewService.nextPagePagination(this.pageSize, this.pageIndex);
    }

    public trackById(_index: number, caze: Case) {
        return caze.stringId;
    }
}
