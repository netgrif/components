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
     * Create empty filter of provided type
     * @param type type of resources that the filter can query
     * @returns a filter with empty body of the provided type
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
     * See [Filter.getRequestBody()]{@link Filter#getRequestBody}
     */
    getRequestBody(): TaskSearchRequestBody | CaseSearchRequestBody {
        return this.deepCopy(this._filter) as CaseSearchRequestBody | TaskSearchRequestBody;
    }
}
