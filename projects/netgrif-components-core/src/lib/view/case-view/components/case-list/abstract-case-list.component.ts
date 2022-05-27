import {
    Inject,
    Optional,
    ViewChild
} from '@angular/core';
import {CaseViewService} from '../../service/case-view-service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {LoggerService} from '../../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultCaseList} from '../default-case-list/abstract-default-case-list';

export abstract class AbstractCaseListComponent extends AbstractDefaultCaseList {

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _caseViewService: CaseViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                          protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, route);
        this.cases$ = this._caseViewService.cases$;
        this.onRedirect();
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
}
