import {Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {LoadFilterInjectionData} from './model/load-filter-injection-data';
import {LoggerService} from '../../../logger/services/logger.service';
import {AbstractCaseView} from '../../../view/case-view/abstract-case-view';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {Case} from '../../../resources/interface/case';

export abstract class AbstractLoadFilterComponent extends AbstractCaseView {

    protected _injectedData: LoadFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _log: LoggerService,
                          caseViewService: CaseViewService) {
        super(caseViewService);
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as LoadFilterInjectionData;
        }
    }

    handleCaseClick(clickedCase: Case) {
        console.log(clickedCase);
    }
}
