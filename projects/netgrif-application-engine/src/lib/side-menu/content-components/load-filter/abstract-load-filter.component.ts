import {Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {LoadFilterInjectionData} from './model/load-filter-injection-data';
import {LoggerService} from '../../../logger/services/logger.service';
import {AbstractCaseView} from '../../../view/case-view/abstract-case-view';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {Case} from '../../../resources/interface/case';
import {getImmediateData} from '../../../utility/get-immediate-data';
import {UserFilterConstants} from '../../../filter/models/user-filter-constants';
import {SavedFilterMetadata} from '../../../search/models/persistance/saved-filter-metadata';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterMetadata} from '../../../search/models/persistance/filter-metadata';

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
        const filterField = getImmediateData(clickedCase, UserFilterConstants.FILTER_FIELD_ID);
        const viewIdField = getImmediateData(clickedCase, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID);

        if (filterField === undefined || viewIdField === undefined) {
            this._log.errorAndThrow(new Error(`Case with ID '${clickedCase.stringId}' does not have filter field with ID '${
                UserFilterConstants.FILTER_FIELD_ID}' or text field with ID '${UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID}'`));
        }

        this._sideMenuControl.close({
            opened: false,
            message: 'Filter selected',
            data: {
                allowedNets: filterField.allowedNets,
                filterMetadata: filterField.filterMetadata,
                originViewId: viewIdField.value,
                filterCase: clickedCase,
                filterCaseId: clickedCase.stringId,
                filter: new SimpleFilter(clickedCase.stringId, (filterField.filterMetadata as FilterMetadata).filterType, {
                    query: filterField.value
                }, clickedCase.title)
            } as SavedFilterMetadata
        });
    }
}
