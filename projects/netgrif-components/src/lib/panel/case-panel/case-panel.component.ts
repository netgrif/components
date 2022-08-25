import {Component, Optional} from '@angular/core';
import {
    AbstractCasePanelComponent,
    CaseViewService,
    LoggerService,
    OverflowService,
    UserService
} from '@netgrif/components-core';
import {CaseResourceService, PermissionService} from '@netgrif/components-core';
import {SnackBarService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent {
    constructor(protected _caseResourceService: CaseResourceService,
                protected _caseViewService: CaseViewService,
                protected _snackBarService: SnackBarService,
                protected _translateService: TranslateService,
                protected _log: LoggerService,
                protected _userService: UserService,
                protected _currencyPipe: CurrencyPipe,
                public _permissionService: PermissionService,
                @Optional() protected _overflowService: OverflowService) {
        super(_caseResourceService, _caseViewService, _snackBarService,
            _translateService, _log, _userService, _currencyPipe, _permissionService, _overflowService);
    }
}
