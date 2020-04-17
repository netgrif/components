import {Filter} from './filter';
import {MergeOperator} from './merge-operator';
import {TaskSearchRequestBody} from './task-search-request-body';
import {CaseSearchRequestBody} from './case-search-request-body';
import {FilterType} from './filter-type';


export class MergedFilter extends Filter {

    private readonly _filters: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>;

    constructor(id: string, type: FilterType, filterBodies: Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>,
                protected _operator: MergeOperator) {
        super(id, type);
        this._filters = [];
        filterBodies.forEach(body => {
            this._filters.push(this.deepCopy(body));
        });
    }

    clone(): Filter {
        return new MergedFilter(this.id, this.type, this._filters, this._operator);
    }

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
        const otherFilters = filter.requestBody;
        if (Array.isArray(otherFilters)) {
            combinedFilters.push(...otherFilters);
        } else {
            combinedFilters.push(otherFilters);
        }

        return new MergedFilter(id, this.type, combinedFilters, this._operator);
    }

    get requestBody(): Array<TaskSearchRequestBody> | Array<CaseSearchRequestBody> {
        return this.deepCopy(this._filters) as Array<CaseSearchRequestBody> | Array<TaskSearchRequestBody>;
    }
}
