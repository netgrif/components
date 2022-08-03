import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {LoadFilterInjectionData} from './model/load-filter-injection-data';
import {LoggerService} from '../../../logger/services/logger.service';
import {AbstractCaseViewComponent} from '../../../view/case-view/abstract-case-view';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {Case} from '../../../resources/interface/case';
import {getImmediateData} from '../../../utility/get-immediate-data';
import {UserFilterConstants} from '../../../filter/models/user-filter-constants';
import {SavedFilterMetadata} from '../../../search/models/persistance/saved-filter-metadata';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ncc-abstract-load-filter',
    template: ''
})
export abstract class AbstractLoadFilterComponent extends AbstractCaseViewComponent {

    protected _injectedData: LoadFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _log: LoggerService,
                          caseViewService: CaseViewService,
                          protected _activatedRoute?: ActivatedRoute) {
        super(caseViewService);
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as LoadFilterInjectionData;
        }
    }

    handleCaseClick(clickedCase: Case) {
        const immediate = getImmediateData(clickedCase, UserFilterConstants.FILTER_FIELD_ID);
        this._sideMenuControl.close({
            opened: false,
            message: 'Filter selected',
            data: {
                allowedNets: immediate.allowedNets,
                filterMetadata: immediate.filterMetadata,
                originViewId: getImmediateData(clickedCase, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID).value,
                filterCase: clickedCase,
                filterCaseId: clickedCase.stringId,
                filter: new SimpleFilter(clickedCase.stringId, immediate.filterMetadata.filterType, {
                    query: immediate.value
                }, clickedCase.title)
            } as SavedFilterMetadata
        });
    }
}
