import {SideMenuControl} from '../../models/side-menu-control';
import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {Case} from '../../../resources/interface/case';
import {AbstractCaseViewComponent} from '../../../view/case-view/abstract-case-view';
import {UserImpersonateConfigMetadata} from '../../../impersonation/models/user-impersonate-config-metadata';
import {UserImpersonateInjectionData} from './model/user-impersonate-injection-data';

@Component({
    selector: 'ncc-abstract-user-impersonate',
    template: ''
})
export abstract class AbstractUserImpersonateComponent extends AbstractCaseViewComponent {

    protected _injectedData: UserImpersonateInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          caseViewService: CaseViewService) {
        super(caseViewService);
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as UserImpersonateInjectionData;
        }
    }

    handleCaseClick(clickedCase: Case) {
        this._sideMenuControl.close({
            opened: false,
            message: 'User selected',
            data: {
                stringId: clickedCase.stringId
            } as UserImpersonateConfigMetadata
        });
    }
}
