import {MergeOperator} from './merge-operator';
import {MergedFilter} from './merged-filter';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';

export abstract class Filter {

    protected _filterData: any;

    protected constructor(protected readonly _id: string, protected readonly _type: FilterType) {
    }

    /**
     * Unique filter identifier
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Determines the type of resource this Filter can filter.
     */
    public get type(): FilterType {
        return this._type;
    }

    /**
     * Creates a deep copy of the filter object.
     * @returns deep copy of the filter object
     */
    public abstract clone(): Filter;

    /**
     * Combines two filters together with the given operator.
     * @param filter filter that should be combined with this filter
     * @param operator operator that is used to combine the two filters
     * @returns a new filter that is the combination of this filter and the filter passed trough the argument
     */
    public abstract merge(filter: Filter, operator: MergeOperator): MergedFilter;

    /**
     * @returns search request body specified by this filter. Type of the result is determined by the `type` of the Filter instance.
     */
    public abstract get requestBody():
        TaskSearchRequestBody | CaseSearchRequestBody | Array<TaskSearchRequestBody> | Array<CaseSearchRequestBody>;
}
