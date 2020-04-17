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
     * @param title human readable filter name
     */
    constructor(id: string, type: FilterType, filterBody: CaseSearchRequestBody | TaskSearchRequestBody, title?: string) {
        super(id, type, title);
        this._filter = this.deepCopy(filterBody);
    }

    clone(): Filter {
        return new SimpleFilter(this.id, this.type, this._filter, this.title);
    }

    merge(filter: Filter, operator: MergeOperator): MergedFilter {
        const temp = new MergedFilter(this.id, this.type, [this._filter], operator, this.title);
        return temp.merge(filter, operator);
    }

    get requestBody(): TaskSearchRequestBody | CaseSearchRequestBody {
        return this.deepCopy(this._filter) as CaseSearchRequestBody | TaskSearchRequestBody;
    }
}
