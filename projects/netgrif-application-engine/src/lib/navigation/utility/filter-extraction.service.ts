import {Injectable} from '@angular/core';
import {Filter} from '../../filter/models/filter';
import {DataGroup} from '../../resources/interface/data-groups';
import {extractFilterFromFilterField} from './navigation-item-task-utility-methods';
import {getFieldFromDataGroups, getFieldIndexFromDataGroups} from '../../utility/get-field';
import {UserFilterConstants} from '../../filter/models/user-filter-constants';
import {FilterRepository} from '../../filter/filter.repository';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {LoggerService} from '../../logger/services/logger.service';
import {MergeOperator} from '../../filter/models/merge-operator';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {FilterField} from '../../data-fields/filter-field/models/filter-field';
import {DataField} from '../../data-fields/models/abstract-data-field';

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

    public extractCompleteFilterFromData(dataSection: Array<DataGroup>, taskReffed = true): Filter | undefined {
        const filterIndex = getFieldIndexFromDataGroups(dataSection, UserFilterConstants.FILTER_FIELD_ID, taskReffed);

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

        const parentFilter = this.extractCompleteFilterFromData(dataSection.slice(filterIndex.dataGroupIndex + 1));

        if (parentFilter !== undefined) {
            return filterSegment.merge(parentFilter, MergeOperator.AND);
        }

        // Is the filter view rooted?
        const rootViewIdField = getFieldFromDataGroups(dataSection, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID, taskReffed);
        if (rootViewIdField === undefined) {
            return filterSegment;
        }

        const rootViewFilter = this.extractViewFilter(rootViewIdField);
        if (rootViewFilter !== undefined) {
            return filterSegment.merge(rootViewFilter, MergeOperator.AND);
        }
        return filterSegment;
    }

    protected extractViewFilter(originViewIdField: DataField<any>): Filter | undefined {
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
