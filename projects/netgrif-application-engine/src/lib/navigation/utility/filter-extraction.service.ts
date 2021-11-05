import {Injectable} from '@angular/core';
import {Filter} from '../../filter/models/filter';
import {DataGroup} from '../../resources/interface/data-groups';
import {extractFilterFieldFromData, extractFilterFromFilterField} from './navigation-item-task-utility-methods';
import {getFieldFromDataGroups, getFieldIndexFromDataGroups} from '../../utility/get-field';
import {UserFilterConstants} from '../../filter/models/user-filter-constants';
import {FilterRepository} from '../../filter/filter.repository';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {LoggerService} from '../../logger/services/logger.service';
import {MergeOperator} from '../../filter/models/merge-operator';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';

/**
 * This service is able to load the full saved filter including all of its ancestor filters.
 */
@Injectable({
    providedIn: 'root'
})
export class FilterExtractionService {

    // the same regexs is used in a backend filter process action. Please keep them in sync
    protected static readonly UNTABBED_VIEW_ID_EXTRACTOR = '^.*?(-\\d+)?$';

    constructor(protected _filterRepository: FilterRepository,
                protected _taskResourceService: TaskResourceService,
                protected _log: LoggerService) {
    }

    public extractCompleteFilterFromData(dataSection: Array<DataGroup>, taskReffed = true): Filter {
        const field = extractFilterFieldFromData(dataSection, taskReffed);
        if (field === undefined) {
            throw new Error('Could not extract filter field from task data');
        }

        let filterSegment: Filter;
        try {
            filterSegment = extractFilterFromFilterField(field);
        } catch (e) {
            throw new Error('Filter segment could not be extracted from filter field');
        }

        const parentFilterIndex = getFieldIndexFromDataGroups(dataSection, UserFilterConstants.PARENT_FILTER_CASE_ID_FIELD_ID, taskReffed);
        if (parentFilterIndex === undefined) {
            const rootViewFilter = this.extractViewFilter(dataSection, true);
            if (rootViewFilter !== undefined) {
                filterSegment.merge(rootViewFilter, MergeOperator.AND);
            }
            return filterSegment;
        }

        return filterSegment.merge(
            this.extractCompleteFilterFromData(dataSection.slice(parentFilterIndex.dataGroupIndex + 1)),
            MergeOperator.AND
        );
    }

    protected extractViewFilter(dataSection: Array<DataGroup>, taskReffed = true): Filter {
        const originViewIdField = getFieldFromDataGroups(dataSection, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID, taskReffed);
        if (originViewIdField === undefined || !(originViewIdField instanceof TextField)) {
            throw new Error('Could not extract origin view id field from task data');
        }
        const originViewId = originViewIdField.value;

        const match = originViewId.match(FilterExtractionService.UNTABBED_VIEW_ID_EXTRACTOR);
        if (match === null) {
            throw new Error('Unexpected state. View Id of origin app view could not be extracted');
        }
        const originUntabbedViewId = originViewId.substring(0, originViewId.length - (match[1]?.length ?? 0));
        const appOriginFilter = this._filterRepository.getFilter(originUntabbedViewId);
        if (appOriginFilter === undefined) {
            this._log.error(`Could not retrieve origin app filter with id '${originUntabbedViewId}'. Falling back to empty filter`);
            return undefined;
        }
        return appOriginFilter;
    }

}
