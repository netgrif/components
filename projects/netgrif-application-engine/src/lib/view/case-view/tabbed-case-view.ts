import {AbstractCaseView} from './abstract-case-view';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Inject, Type} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabData} from '../../tabs/interfaces';
import {Case} from '../../resources/interface/case';
import {LoggerService} from '../../logger/services/logger.service';

export interface InjectedTabbedCaseViewData extends InjectedTabData {
    tabViewComponent: Type<any>;
    tabViewOrder: number;
}

export abstract class TabbedCaseView extends AbstractCaseView {

    private readonly _correctlyInjected;

    protected constructor(sideMenuService: SideMenuService,
                          caseResourceService: CaseResourceService,
                          protected _loggerService: LoggerService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                          baseFilter: string = '{}',
                          protected _autoswitchToTaskTab: boolean = true) {

        super(sideMenuService, caseResourceService, _loggerService, baseFilter);
        this._correctlyInjected = !!this._injectedTabData.tabViewComponent && this._injectedTabData.tabViewOrder !== undefined;
        if (!this._correctlyInjected) {
            this._loggerService.warn('TabbedCaseView must inject a filled object of type InjectedTabbedCaseViewData to work properly!');
        }
    }

    public handleCaseClick(clickedCase: Case): void {
        if (this._correctlyInjected) {
            this._injectedTabData.tabGroupRef.openTab({
                label: {
                    text: clickedCase.title,
                    icon: clickedCase.icon ? clickedCase.icon : 'check_box'
                },
                canBeDeleted: true,
                tabContentComponent: this._injectedTabData.tabViewComponent,
                injectedObject: {
                    // TODO Filters
                    baseFilter: `{"case":"${clickedCase.stringId}"}`
                },
                order: this._injectedTabData.tabViewOrder
            }, this._autoswitchToTaskTab);
        }
    }
}
