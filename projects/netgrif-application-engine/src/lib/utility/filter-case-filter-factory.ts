import {Case} from '../resources/interface/case';
import {BaseFilter} from '../search/models/base-filter';
import {NAE_FILTER_CASE} from '../navigation/model/filter-case-injection-token';
import {getImmediateData} from './get-immediate-data';
import {UserFilterConstants} from '../filter/models/user-filter-constants';
import {SimpleFilter} from '../filter/models/simple-filter';

/**
 * Converts an {@link NAE_FILTER_CASE} injection token into {@link NAE_BASE_FILTER}
 * @param filterCase a filter process instance
 */
export function filterCaseFilterFactory(filterCase: Case): BaseFilter {
    const filterData = getImmediateData(filterCase, UserFilterConstants.FILTER_FIELD_ID);
    if (filterData === undefined) {
        throw new Error(`Cannot get filter from case '${filterCase.title}' with id '${filterCase.stringId}'`);
    }
    return {
        filter: SimpleFilter.fromQuery({query: filterData.value}, filterData.filterMetadata.filterType)
    };
}
