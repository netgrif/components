import {MergeOperator} from './merge-operator';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';
import {Params} from '../../resources/resource-provider.service';

/**
 * Abstraction of backend search requests that defines a limited set of operations on them.
 */
export abstract class Filter {

    /**
     * If no name is provided the filter will be identified by it's ID when necessary.
     * @param _id identifier of the filter
     * @param _type type of resources that the filter can query
     * @param _title human readable filter name
     */
    protected constructor(protected _id: string, protected readonly _type: FilterType, protected readonly _title: string = '') {
    }

    /**
     * Unique filter identifier
     */
    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    /**
     * Determines the type of resource this Filter can filter.
     */
    public get type(): FilterType {
        return this._type;
    }

    /**
     * Human readable filter title.
     *
     * Defaults to empty string.
     */
    public get title(): string {
        return this._title;
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
     * @returns a new filter that is the combination of this filter and the filter passed trough the argument.
     * Library implementation always returns a {@link MergedFilter} object instance.
     */
    public abstract merge(filter: Filter, operator: MergeOperator): Filter;

    /**
     * @returns search request body specified by this filter. Type of the result is determined by the `type` of the Filter instance.
     */
    public abstract getRequestBody():
        TaskSearchRequestBody | CaseSearchRequestBody | Array<TaskSearchRequestBody> | Array<CaseSearchRequestBody>;

    /**
     * @returns `true` if at least one of the filter bodies contains the `query` attribute. Returns `false` otherwise.
     */
    public abstract bodyContainsQuery(): boolean;

    /**
     * Returns the necessary request params for the filter. Default implementation returns an empty object.
     * The params are added on top of the request when sending it to the backend by the respective service methods.
     * @returns an empty object `{}`
     */
    public getRequestParams(): Params {
        return {};
    }

    /**
     * Creates a deep copy of a simple object.
     * @param obj object that should be copied
     * @returns a deep copy of the argument
     */
    protected deepCopy(obj: object): object {
        return JSON.parse(JSON.stringify(obj));
    }
}
