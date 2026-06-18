import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    CaseViewService,
    InjectedTabData,
    LoggerService,
    NAE_TAB_DATA,
    NetgrifPaginatorIntl,
    AbstractCaseListPaginatorComponent,
    LanguageService
} from '@netgrif/components-core';
import {MatPaginatorIntl} from '@angular/material/paginator';

@Component({
    selector: 'nc-case-list-paginator',
    templateUrl: './case-list-paginator.component.html',
    styleUrls: ['./case-list-paginator.component.scss'],
    providers: [{provide: MatPaginatorIntl, useClass: NetgrifPaginatorIntl}]
})
export class CaseListPaginatorComponent extends AbstractCaseListPaginatorComponent implements OnDestroy {

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected _selectLangService: LanguageService,
                protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, _selectLangService, route);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
