import {AbstractCaseView} from './abstract-case-view';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Inject, Type} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabData} from '../../tabs/interfaces';
import {Case} from '../../resources/interface/case';

export interface InjectedTabbedCaseViewData extends InjectedTabData {
    tabViewComponent: Type<any>;
    tabViewOrder: number;
}

export abstract class TabbedCaseView extends AbstractCaseView {

    protected constructor(_sideMenuService: SideMenuService,
                          _caseResourceService: CaseResourceService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                          _baseFilter: string = '{}',
                          protected _autoswitchToTaskTab: boolean = true) {
        super(_sideMenuService, _caseResourceService, _baseFilter);
    }

    public handleCaseClick(clickedCase: Case): void {
        this._injectedTabData.tabGroupRef.openTab({
            label: {
                text: clickedCase.title,
                icon: clickedCase.icon ? clickedCase.icon : 'check_box'
            },
            canBeDeleted: true,
            tabContentComponent: this._injectedTabData.tabViewComponent,
            injectedObject: {
                baseFilter: `{"case":"${clickedCase.stringId}"}`
            },
            order: this._injectedTabData.tabViewOrder
        }, this._autoswitchToTaskTab);
    }
}
