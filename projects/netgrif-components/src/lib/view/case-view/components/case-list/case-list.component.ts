import {Component} from '@angular/core';
import {LoggerService, AbstractCaseListComponent, CaseViewService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent extends AbstractCaseListComponent {

    constructor(protected _caseViewService: CaseViewService, protected _log: LoggerService) {
        super(_caseViewService, _log);
    }
}
