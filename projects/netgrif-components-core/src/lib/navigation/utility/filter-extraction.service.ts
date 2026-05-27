import {Injectable} from '@angular/core';
import {Filter} from '../../filter/models/filter';
import {DataGroup} from '../../resources/interface/data-groups';
import {extractFilterFromFilterField} from './navigation-item-task-utility-methods';
import {getFieldIndexFromDataGroups} from '../../utility/get-field';
import {FilterRepository} from '../../filter/filter.repository';
import {LoggerService} from '../../logger/services/logger.service';
import {MergeOperator} from '../../filter/models/merge-operator';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {FilterField} from '../../data-fields/filter-field/models/filter-field';
import {GroupNavigationConstants} from "../model/group-navigation-constants";
import {AllowedNetsService} from "../../allowed-nets/services/allowed-nets.service";
import {
    AllowedNetsServiceFactory,
    navigationItemTaskAllowedNetsServiceFactory
} from "../../allowed-nets/services/factory/allowed-nets-service-factory";
import {BaseAllowedNetsService} from "../../allowed-nets/services/base-allowed-nets.service";
import {ActivatedRoute} from '@angular/router';
import {SimpleFilter} from '../../filter/models/simple-filter';

/**
 * This service is able to load the full saved filter including all of its ancestor filters.
 */
@Injectable({
    providedIn: 'root'
})
export class FilterExtractionService {

    // the same regex is used in a backend filter process action. Please keep them in sync
    protected static readonly UNTABBED_VIEW_ID_EXTRACTOR = '^.*?(-\\d+)?$';

    constructor(protected _filterRepository: FilterRepository,
                protected _taskResourceService: TaskResourceService,
                protected _factory: AllowedNetsServiceFactory,
                protected baseAllowedNets: BaseAllowedNetsService,
                protected _log: LoggerService) {
    }

    public extractTaskFilterAllowedNets(dataSection: Array<DataGroup>): AllowedNetsService {
        return navigationItemTaskAllowedNetsServiceFactory(this._factory, this.baseAllowedNets, dataSection, GroupNavigationConstants.ITEM_FIELD_TASK_FILTER)
    }

    public extractCompleteFilterFromData(dataSection?: Array<DataGroup>, activatedRoute?: ActivatedRoute, filterData?: Filter, fieldId?: string): Filter | undefined {
        if (!dataSection) {
            if (!activatedRoute) {
                throw new Error('ActivatedRoute not provided.');
            }
            const singleCaseId = activatedRoute.snapshot.paramMap.get('singleCaseId');
            if (!singleCaseId) {
                throw new Error('Case ID not found in route.');
            }
            return SimpleFilter.fromTaskQuery({case: {id: singleCaseId}});
        }
        const filterIndex = getFieldIndexFromDataGroups(dataSection, fieldId);

        if (filterIndex === undefined) {
            return undefined;
        }

        let filterSegment: Filter;
        try {
            filterSegment = extractFilterFromFilterField(
                dataSection[filterIndex.dataGroupIndex].fields[filterIndex.fieldIndex] as FilterField
            );
        } catch (e) {
            throw new Error('Filter segment could not be extracted from filter field');
        }

        if (!!filterData) {
            filterSegment = filterSegment.merge(filterData, MergeOperator.AND);
        }

        const parentFilter = this.extractCompleteFilterFromData(dataSection.slice(filterIndex.dataGroupIndex + 1), activatedRoute, filterData);

        if (parentFilter !== undefined && parentFilter.type === filterSegment.type) {
            return filterSegment.merge(parentFilter, MergeOperator.AND);
        }
        return filterSegment;
    }

}
