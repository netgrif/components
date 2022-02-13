import {Component, Inject, Optional} from '@angular/core';
import {AbstractCaseListComponent, CaseViewService, InjectedTabData, LoggerService, NAE_TAB_DATA} from '@netgrif/components-core';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
    selector: 'nc-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent extends AbstractCaseListComponent {

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_caseViewService, _log, injectedTabData, route);
    }
}
