import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Filter} from '../../filter/models/filter';
import {DataGroup} from '../../resources/interface/data-groups';
import {extractFilterFieldFromData, extractFilterFromFilterField} from './navigation-item-task-utility-methods';
import {getField} from '../../utility/get-field';
import {UserFilterConstants} from '../../filter/models/user-filter-constants';
import {FilterRepository} from '../../filter/filter.repository';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {LoggerService} from '../../logger/services/logger.service';
import {MergeOperator} from '../../filter/models/merge-operator';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FilterExtractionService {

    protected static readonly PARENT_FILTER_EXTRACTOR = /^.*?([a-f\d]{24})(?:-\d+)?$/;
    protected static readonly UNTABBED_VIEW_ID_EXTRACTOR = /^.*?(-\d+)?$/;

    constructor(protected _filterRepository: FilterRepository,
                protected _taskResourceService: TaskResourceService,
                protected _log: LoggerService) {
    }

    public extractCompleteFilterFromData(dataSection: Array<DataGroup>, taskReffed = true): Observable<Filter> {
        const field = extractFilterFieldFromData(dataSection, taskReffed);
        if (field === undefined) {
            return throwError('Could not extract filter field from task data');
        }

        let filterSegment;
        try {
            filterSegment = extractFilterFromFilterField(field);
        } catch (e) {
            return throwError('Filter segment could not be extracted from filter field');
        }

        const originViewIdField = getField(dataSection[0].fields, UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID, taskReffed);
        if (originViewIdField === undefined || !(originViewIdField instanceof TextField)) {
            return throwError('Could not extract origin view id field from task data');
        }

        const match = originViewIdField.value.match(FilterExtractionService.PARENT_FILTER_EXTRACTOR);

        if (match === null && originViewIdField.value === '') {
            this._log.debug('The currently processed filter is a root filter');
            return of(filterSegment);
        } else if (match === null) {
            return this.extractAppFilter(originViewIdField.value, filterSegment);
        }

        return this._taskResourceService.getData(match[1]).pipe(map(data => {

        }));
    }

    protected extractAppFilter(originViewId: string, filterSegment: Filter): Observable<Filter> {
        const match = originViewId.match(FilterExtractionService.UNTABBED_VIEW_ID_EXTRACTOR);
        if (match === null) {
            return throwError('Unexpected state. View Id of origin app view could not be extracted');
        }
        const originUntabbedViewId = originViewId.substring(0, originViewId.length - match[1].length);
        const appOriginFilter = this._filterRepository.getFilter(originUntabbedViewId);
        if (appOriginFilter === undefined) {
            this._log.error(`Could not retrieve origin app filter with id '${originUntabbedViewId}'. Falling back to empty filter`);
            return of(filterSegment);
        }
        return of(filterSegment.merge(appOriginFilter, MergeOperator.AND));
    }

}
