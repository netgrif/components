import {Filter} from './filter';
import {MergeOperator} from './merge-operator';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';

/**
 * Represents an union or an intersection of {@link SimpleFilter}s and allows limited manipulation with it.
 */
export class MergedFilter extends Filter {

    /**
     * @ignore
     * Stores the underlying filter data
     */
    private readonly _filters: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>;

    /**
     * @param id identifier of the filter
     * @param type type of resources that the filter can query
     * @param filterBodies `Array` of search requests matching this filter's type
     * @param _operator boolean operator that is used to combine the filters
     * @param title human readable filter name
     */
    constructor(id: string, type: FilterType, filterBodies: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>,
                protected _operator: MergeOperator, title?: string) {
        super(id, type, title);
        this._filters = [];
        filterBodies.forEach(body => {
            this._filters.push(this.deepCopy(body));
        });
    }

    /**
     * See [Filter.clone()]{@link Filter#clone}
     */
    clone(): Filter {
        return new MergedFilter(this.id, this.type, this._filters, this._operator, this.title);
    }

    /**
     * Filters that are merged must share the same type and the same merge operator.
     *
     * See [Filter.merge()]{@link Filter#merge} for information about parameters.
     */
    merge(filter: Filter, operator: MergeOperator): MergedFilter {
        if (filter.type !== this.type) {
            throw new Error('Can\'t merge filters with different types');
        }
        if (this._operator !== operator || (filter instanceof MergedFilter && filter._operator !== this._operator)) {
            throw new Error('Can\'t merge filters with different merge operators');
        }

        const id = `${this.id}${operator === MergeOperator.AND ? '&' : '|'}${filter.id}`;

        const combinedFilters: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody> = [];
        combinedFilters.push(...this._filters);
        const otherFilters = filter.getRequestBody();
        if (Array.isArray(otherFilters)) {
            combinedFilters.push(...otherFilters);
        } else {
            combinedFilters.push(otherFilters);
        }

        return new MergedFilter(id, this.type, combinedFilters, this._operator);
    }

    /**
     * See [Filter.getRequestBody()]{@link Filter#getRequestBody}
     */
    getRequestBody(): Array<TaskSearchRequestBody> | Array<CaseSearchRequestBody> {
        return this.deepCopy(this._filters) as Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>;
    }
}
