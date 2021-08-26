import {Filter} from './filter';
import {MergeOperator} from './merge-operator';
import {MergedFilter} from './merged-filter';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';

/**
 * Holds backend search request data and allows limited manipulation with it.
 */
export class SimpleFilter extends Filter {

    /**
     * @ignore
     * Stores the underlying filter data
     */
    private readonly _filter: CaseSearchRequestBody | TaskSearchRequestBody;

    /**
     * Create an empty filter of provided type
     * @param type type of resources that the filter can query
     * @returns a filter with empty body of the provided type. `id` of the new filter is set to an empty string.
     */
    public static empty(type: FilterType): Filter {
        return new SimpleFilter('', type, {});
    }

    /**
     * Equivalent to calling `SimpleFilter.empty(FilterType.CASE)`.
     * @returns a filter with empty body that can be used to search cases
     */
    public static emptyCaseFilter(): Filter {
        return SimpleFilter.empty(FilterType.CASE);
    }

    /**
     * Equivalent to calling `SimpleFilter.empty(FilterType.TASK)`.
     * @returns a filter with empty body that can be used to search tasks
     */
    public static emptyTaskFilter(): Filter {
        return SimpleFilter.empty(FilterType.TASK);
    }

    /**
     * Creates a filter with the provided body and the provided type
     * @param filterBody the body of the new filter
     * @param type the type of the new filter. Type must match the type of the body.
     * @returns a filter with the given body and type. `id` of the new filter is set to an empty string.
     */
    public static fromQuery(filterBody: CaseSearchRequestBody | TaskSearchRequestBody, type: FilterType): Filter {
        return new SimpleFilter('', type, filterBody);
    }

    /**
     * Creates a case filter with the provided body
     * @param filterBody the body of the new filter
     * @returns a case filter with the given body. `id` of the new filter is set to an empty string.
     */
    public static fromCaseQuery(filterBody: CaseSearchRequestBody): Filter {
        return SimpleFilter.fromQuery(filterBody, FilterType.CASE);
    }

    /**
     * Creates a task filter with the provided body
     * @param filterBody the body of the new filter
     * @returns a task filter with the given body. `id` of the new filter is set to an empty string.
     */
    public static fromTaskQuery(filterBody: TaskSearchRequestBody): Filter {
        return SimpleFilter.fromQuery(filterBody, FilterType.TASK);
    }

    /**
     * @param id identifier of the filter
     * @param type type of resources that the filter can query
     * @param filterBody search request matching this filter's `type`
     * @param title human readable filter name
     */
    constructor(id: string, type: FilterType, filterBody: CaseSearchRequestBody | TaskSearchRequestBody, title?: string) {
        super(id, type, title);
        this._filter = this.deepCopy(filterBody);
    }

    /**
     * See [Filter.clone()]{@link Filter#clone}
     */
    clone(): Filter {
        return new SimpleFilter(this.id, this.type, this._filter, this.title);
    }

    /**
     * See [Filter.merge()]{@link Filter#merge}
     */
    merge(filter: Filter, operator: MergeOperator): MergedFilter {
        const temp = new MergedFilter(this.id, this.type, [this._filter], operator, this.title);
        return temp.merge(filter, operator);
    }

    /**
     * See [Filter.bodyContainsQuery()]{@link Filter#bodyContainsQuery}
     */
    bodyContainsQuery(): boolean {
        return this._filter.query !== undefined && this._filter.query !== null;
    }

    /**
     * See [Filter.getRequestBody()]{@link Filter#getRequestBody}
     */
    getRequestBody(): TaskSearchRequestBody | CaseSearchRequestBody {
        return this.deepCopy(this._filter) as CaseSearchRequestBody | TaskSearchRequestBody;
    }
}
