import {AbstractCaseView} from './abstract-case-view';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Inject, Type} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabData} from '../../tabs/interfaces';

export interface InjectedTabbedCaseViewData extends InjectedTabData {
    tabViewComponent: Type<any>;
    tabViewOrder: number;
}

abstract class TabbedCaseView extends AbstractCaseView {

    protected constructor(private _sideMenuService: SideMenuService,
                          private _caseResourceService: CaseResourceService,
                          @Inject(NAE_TAB_DATA) private _injectedTabData: InjectedTabbedCaseViewData,
                          private _baseFilter: string = '{}',
                          private _autoswitchToTaskTab: boolean = true) {
        super(_sideMenuService, _caseResourceService, _baseFilter);
    }

    protected handleCaseClick(caseId: string): void {
        this._injectedTabData.tabGroupRef.openTab({
            label: {
                text:
            }
        }, this._autoswitchToTaskTab);
    }
}
