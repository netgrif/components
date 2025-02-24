import {BaseFilter} from '../search/models/base-filter';
import {DataGroup} from '../resources/interface/data-groups';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../navigation/model/filter-case-injection-token';
import {FilterExtractionService} from '../navigation/utility/filter-extraction.service';
import {Filter} from '../filter/models/filter';

/**
 * Converts an {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token into {@link NAE_BASE_FILTER}
 * @param extractionService
 * @param navigationItemTaskData a navigation item task containing the aggregated data representing a navigation item
 */
export function navigationItemTaskFilterFactory(extractionService: FilterExtractionService,
                                                navigationItemTaskData: Array<DataGroup>,
                                                filterData?: Filter): BaseFilter {
    return {
        filter: extractionService.extractCompleteFilterFromData(navigationItemTaskData, filterData)
    };
}
