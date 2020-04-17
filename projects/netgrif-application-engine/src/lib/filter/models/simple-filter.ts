import {Filter} from './filter';
import {MergeOperator} from './merge-operator';
import {MergedFilter} from './merged-filter';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';


export class SimpleFilter extends Filter {

    private readonly _filter: CaseSearchRequestBody | TaskSearchRequestBody;

    /**
     * @param id identifier of the filter
     * @param type type of resources that the filter can query
     * @param filterBody search request matching this filter's `type`
     */
    constructor(id: string, type: FilterType, filterBody: CaseSearchRequestBody | TaskSearchRequestBody) {
        super(id, type);
        this._filter = this.deepCopy(filterBody);
    }

    clone(): Filter {
        return new SimpleFilter(this.id, this.type, this._filter);
    }

    merge(filter: Filter, operator: MergeOperator): MergedFilter {
        const temp = new MergedFilter(this.id, this.type, [this._filter], operator);
        return temp.merge(filter, operator);
    }

    get requestBody(): TaskSearchRequestBody | CaseSearchRequestBody {
        return this.deepCopy(this._filter) as CaseSearchRequestBody | TaskSearchRequestBody;
    }
}
