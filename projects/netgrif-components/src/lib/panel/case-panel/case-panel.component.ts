import {Component} from '@angular/core';
import {AbstractCasePanelComponent, CaseViewService} from '@netgrif/application-engine';
import {CaseResourceService} from '@netgrif/application-engine';
import {SnackBarService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent {
    constructor(protected _caseResourceService: CaseResourceService, protected _caseViewService: CaseViewService,
                protected _snackBarService: SnackBarService, protected _translateService: TranslateService) {
        super(_caseResourceService, _caseViewService, _snackBarService, _translateService);
    }
}
