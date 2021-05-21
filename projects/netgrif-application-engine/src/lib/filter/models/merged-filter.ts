import {Filter} from './filter';
import {MergeOperator} from './merge-operator';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';
import {Params} from '../../resources/resource-provider.service';
import {MergedFilterParams} from './merged-filter-params';

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
     * Creates a filter with the provided body and the provided type
     * @param filterBody the body of the new filter
     * @param operator the merge operator that is used to combine the filters
     * @param type the type of the new filter. Type must match the type of the body.
     * @returns a filter with the given body, operator and type. `id` of the new filter is set to an empty string.
     */
    public static fromQuery(filterBody: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>, operator: MergeOperator,
                            type: FilterType): Filter {
        return new MergedFilter('', type, filterBody, operator);
    }

    /**
     * Creates a case filter with the provided body
     * @param filterBody the body of the new filter
     * @param operator the merge operator that is used to combine the filters
     * @returns a case filter with the given body and operator. `id` of the new filter is set to an empty string.
     */
    public static fromCaseQuery(filterBody: Array<CaseSearchRequestBody>, operator: MergeOperator): Filter {
        return MergedFilter.fromQuery(filterBody, operator, FilterType.CASE);
    }

    /**
     * Creates a task filter with the provided body
     * @param filterBody the body of the new filter
     * @param operator the merge operator that is used to combine the filters
     * @returns a task filter with the given body and operator. `id` of the new filter is set to an empty string.
     */
    public static fromTaskQuery(filterBody: Array<TaskSearchRequestBody>, operator: MergeOperator): Filter {
        return MergedFilter.fromQuery(filterBody, operator, FilterType.TASK);
    }

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

    public set operator(operator: MergeOperator) {
        this._operator = operator;
    }

    public get operator(): MergeOperator {
        return this._operator;
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

    /**
     * See [Filter.bodyContainsQuery()]{@link Filter#bodyContainsQuery}
     */
    bodyContainsQuery(): boolean {
        return this._filters.some(f => f.query !== undefined && f.query !== null);
    }

    /**
     * Returns the necessary request params for the filter.
     * @returns params with `operation` set to either `AND` or `OR` based on this object's `_operator` property.
     *
     * See {@link MergedFilterParams} for more information.
     */
    getRequestParams(): MergedFilterParams & Params {
        return {
            operation: this._operator
        };
    }
}
