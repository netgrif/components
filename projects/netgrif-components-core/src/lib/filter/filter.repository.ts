import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';
import {ConfigFilter} from '../../commons/schema';
import {LoggerService} from '../logger/services/logger.service';
import {MergeOperator} from './models/merge-operator';
import {FilterType} from './models/filter-type';
import {SimpleFilter} from './models/simple-filter';
import {Filter} from './models/filter';
import {MergedFilter} from './models/merged-filter';


/**
 * Allows access to filters defined in nae.json during runtime.
 *
 * Filters are always returned as copies to avoid unintended side effects when operating on them.
 *
 * Also see {@link Filter}.
 */
@Injectable({
    providedIn: 'root'
})
export class FilterRepository {

    /**
     * Stores the filters managed by the repository. Keys are filterIds.
     */
    protected _filters: Map<string, Filter> = new Map<string, Filter>();

    /**
     * Loads and creates filters declared in nae.json.
     */
    constructor(protected _configService: ConfigurationService, protected _log: LoggerService) {
        const filters = _configService.get().filters;
        if (!filters) {
            return;
        }

        Object.keys(filters).forEach(filterId => {
            const configFilter: ConfigFilter = filters[filterId];
            // TODO 17.4.2020 - don't ignore filter.access property
            if (!configFilter.type || !configFilter.body) {
                _log.warn(`Filter '${filterId}' doesn't define all the necessary properties. Skipping.`);
                return;
            }
            if (Array.isArray(configFilter.body)) {
                if (!configFilter.mergeOperator) {
                    _log.warn(`Filter '${filterId}' contains multiple filters, but doesn't define a merge operator. Skipping.`);
                    return;
                }
                this.warnIfFilterExists(filterId);

                const filter = new MergedFilter(filterId, configFilter.type as FilterType,
                    configFilter.body, configFilter.mergeOperator as MergeOperator, configFilter.title);
                this._filters.set(filterId, filter);

            } else {
                this.warnIfFilterExists(filterId);
                const filter = new SimpleFilter(filterId, configFilter.type as FilterType, configFilter.body, configFilter.title);
                this._filters.set(filterId, filter);
            }
        });
    }

    /**
     * Logs a warning if filter with the given id already exists. The warning states that the filter will be replaced.
     * @param filterId ID of the filter who's existence should be checked
     */
    protected warnIfFilterExists(filterId: string): void {
        if (this._filters.has(filterId)) {
            this._log.warn(`Filter with id '${filterId}' already exists in the repository and will be replaced!`);
        }
    }

    /**
     * @param filterId ID of the filter that should be retrieved
     * @returns a copy of the specified filter, or `undefined` if such filter doesn't exist in the repository.
     */
    public getFilter(filterId: string): Filter | undefined {
        let filter = this._filters.get(filterId);
        if (!!filter) {
            filter = filter.clone();
        }
        return filter;
    }

    /**
     * Stores a new filter into the repository. If the repository already contains a filter with the same ID, the stored filter
     * will be replaced and a warning will be logged.
     *
     * The repository stores a copy of the provided filter, to ensure that the objects in the repository aren't referenced from outside.
     * @param filter the filter that should be stored
     */
    public saveFilter(filter: Filter): void {
        this.warnIfFilterExists(filter.id);
        this._filters.set(filter.id, filter.clone());
    }

    /**
     * @returns list of case filter identifiers stored in the repository
     */
    public getCaseFilterList(): Array<string> {
        return this.getFilterList(filter => filter.type === FilterType.CASE);
    }

    /**
     * @returns list of task filter identifiers stored in the repository
     */
    public getTaskFilterList(): Array<string> {
        return this.getFilterList(filter => filter.type === FilterType.TASK);
    }

    /**
     * @param predicate condition that must be fulfilled by the filters in the repository in order to be included in the result
     * @returns list of filter identifiers that fulfill the given predicate
     */
    protected getFilterList(predicate: (f: Filter) => boolean): Array<string> {
        const result = [];
        this._filters.forEach(filter => {
            if (predicate(filter)) {
                result.push(filter.id);
            }
        });
        return result;
    }

    /**
     * @param filterIds list of ids of filters that should be returned
     * @returns list of copies of specified filters. If some of the filters don't exist in the repository, they won't be included
     * and the array will contain less elements than the input array.
     */
    public getFilters(filterIds: Array<string>): Array<Filter> {
        const result = [];
        filterIds.forEach(id => {
            const filter = this.getFilter(id);
            if (filter !== undefined) {
               result.push(filter);
            }
        });
        return result;
    }

    /**
     * Removes all stored filters from the repository
     */
    public removeAllFilters(): void {
        this._filters = new Map<string, Filter>();
    }
}
