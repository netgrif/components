import {Component, Inject, Optional} from '@angular/core';
import {AbstractCaseListComponent, CaseViewService, InjectedTabData, LoggerService, NAE_TAB_DATA} from '@netgrif/application-engine';

@Component({
    selector: 'nc-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent extends AbstractCaseListComponent {

    constructor(protected _caseViewService: CaseViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        super(_caseViewService, _log, injectedTabData);
    }
}
