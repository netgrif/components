import {AbstractCaseViewComponent} from './abstract-case-view';
import {Component, Inject, Optional, Type} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';
import {Case} from '../../resources/interface/case';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseViewService} from './service/case-view-service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {OverflowService} from '../../header/services/overflow.service';
import {
    NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
    NewCaseCreationConfigurationData
} from '../../side-menu/content-components/new-case/model/new-case-injection-data';
import {Observable} from 'rxjs';
import {NAE_AUTOSWITCH_TAB_TOKEN} from './models/autoswitch-token';
import {NAE_OPEN_EXISTING_TAB} from './models/open-existing-tab-token';
import { ActivatedRoute } from '@angular/router';

export interface InjectedTabbedCaseViewData extends InjectedTabData {
    tabViewComponent: Type<any>;
    tabViewOrder: number;
}

@Component({
    selector: 'ncc-abstract-tabbed-case-view',
    template: ''
})
export abstract class AbstractTabbedCaseViewComponent extends AbstractCaseViewComponent {

    private readonly _correctlyInjected;

    protected constructor(caseViewService: CaseViewService,
                          protected _loggerService: LoggerService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                          protected _overflowService?: OverflowService,
                          @Optional() @Inject(NAE_AUTOSWITCH_TAB_TOKEN) protected _autoswitchToTaskTab = true,
                          @Optional() @Inject(NAE_OPEN_EXISTING_TAB) protected _openExistingTab = true,
                          @Optional() @Inject(NAE_NEW_CASE_CREATION_CONFIGURATION_DATA) protected _newCaseCreationConfig: NewCaseCreationConfigurationData = {
                              enableCaseTitle: true,
                              isCaseTitleRequired: true
                          },
                          protected _activatedRoute?: ActivatedRoute) {

        super(caseViewService, _overflowService, undefined, _newCaseCreationConfig, _activatedRoute);
        this._correctlyInjected = !!this._injectedTabData.tabViewComponent && this._injectedTabData.tabViewOrder !== undefined;
        if (!this._correctlyInjected) {
            this._loggerService.warn('AbstractTabbedCaseViewComponent must inject a filled object of type InjectedTabbedCaseViewData to work properly!');
        }
    }

    public handleCaseClick(clickedCase: Case): void {
        if (this._correctlyInjected) {
            this.openTab(clickedCase);
        }
    }

    protected openTab(openCase: Case) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: openCase.title,
                icon: openCase.icon ? openCase.icon : 'check_box'
            },
            canBeClosed: true,
            tabContentComponent: this._injectedTabData.tabViewComponent,
            injectedObject: {
                baseFilter: new SimpleFilter('', FilterType.TASK, {case: {id: `${openCase.stringId}`}}),
                allowedNets: [openCase.processIdentifier]
            },
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }
}
