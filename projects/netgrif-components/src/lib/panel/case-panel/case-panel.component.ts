import {Component, Optional} from '@angular/core';
import {AbstractCasePanelComponent, CaseViewService, LoggerService, OverflowService, UserService} from '@netgrif/components-core';
import {CaseResourceService, PermissionService} from '@netgrif/components-core';
import {SnackBarService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent {
    constructor(protected _caseResourceService: CaseResourceService, protected _caseViewService: CaseViewService,
                protected _snackBarService: SnackBarService, protected _translateService: TranslateService,
                protected _log: LoggerService, @Optional() protected _overflowService: OverflowService,
                protected _userService: UserService, protected _currencyPipe: CurrencyPipe,
                public _permissionService: PermissionService, protected _activatedRoute: ActivatedRoute) {
        super(_caseResourceService, _caseViewService, _snackBarService,
            _translateService, _log, _overflowService, _userService, _currencyPipe, _permissionService,
            _activatedRoute);
    }
}
