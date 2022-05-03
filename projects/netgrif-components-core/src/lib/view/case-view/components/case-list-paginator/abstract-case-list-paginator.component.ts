import {Inject, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Case} from '../../../../resources/interface/case';
import {CaseViewService} from '../../service/case-view-service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {AbstractDefaultCaseList} from '../default-case-list/abstract-default-case-list';

export abstract class AbstractCaseListPaginatorComponent extends AbstractDefaultCaseList {

    length: number;
    pageSize = 20;
    pageIndex = 0;
    pageSizeOptions: number[] = [10, 20, 50];

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, route);
        this.cases$ = this._caseViewService.cases$.pipe(tap(() => {
            this.length = this._caseViewService.pagination.totalElements;
            this.pageIndex = this._caseViewService.pagination.number;
        }));
        this.onRedirect();
    }

    onPageChanged(e) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this._caseViewService.nextPagePagination(this.pageSize, this.pageIndex);
    }

    public trackById(index, caze: Case) {
        return caze.stringId;
    }
}
