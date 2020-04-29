import {AbstractCaseView} from './abstract-case-view';
import {Inject, Type} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabData} from '../../tabs/interfaces';
import {Case} from '../../resources/interface/case';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseViewService} from './case-view-service';
import {Filter} from '../../filter/models/filter';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';

export interface InjectedTabbedCaseViewData extends InjectedTabData {
    tabViewComponent: Type<any>;
    tabViewOrder: number;
}

export abstract class TabbedCaseView extends AbstractCaseView {

    private readonly _correctlyInjected;

    protected constructor(caseViewService: CaseViewService,
                          protected _loggerService: LoggerService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                          baseFilter: Filter = new SimpleFilter('', FilterType.CASE, {}),
                          protected _autoswitchToTaskTab: boolean = true) {

        super(caseViewService, baseFilter);
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
                    baseFilter: new SimpleFilter('', FilterType.TASK, {case: `${clickedCase.stringId}`})
                },
                order: this._injectedTabData.tabViewOrder
            }, this._autoswitchToTaskTab);
        }
    }
}
