import {Injectable} from '@angular/core';
import {FilterResourceService} from '../resources/engine-endpoint/filter-resource.service';
import {Filter} from './models/filter';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MergedFilter} from './models/merged-filter';
import {MergeOperator} from './models/merge-operator';
import {FilterType} from './models/filter-type';

/**
 * Service that manages filters created by users of the application.
 */
@Injectable({
    providedIn: 'root'
})
export class UserFiltersService {

    constructor(protected _filterResourceService: FilterResourceService) {
    }

    public save(filter: Filter, title: string, description?: string): Observable<boolean> {
        return this._filterResourceService.saveFilter({
            title,
            description,
            type: filter.type,
            mergeOperator: filter instanceof MergedFilter ? filter.operator : MergeOperator.AND,
            caseFilterBodies: filter.type === FilterType.CASE ? filter.getRequestBody() : undefined,
            taskFilterBodies: filter.type === FilterType.TASK ? filter.getRequestBody() : undefined,
        }).pipe(map(r => r.success !== undefined));
    }
}
