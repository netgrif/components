import {BaseFilter} from '../search/models/base-filter';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../navigation/model/filter-case-injection-token';
import {DataGroup} from '../resources/interface/data-groups';
import {FilterExtractionService} from '../navigation/utility/filter-extraction.service';

/**
 * Converts an {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token into {@link NAE_BASE_FILTER}
 * @param extractionService
 * @param navigationItemTaskData a navigation item task containing the aggregated data representing a navigation item
 */
export function navigationItemTaskFilterFactory(extractionService: FilterExtractionService,
                                                navigationItemTaskData: Array<DataGroup>): BaseFilter {
    return {
        filter: extractionService.extractCompleteFilterFromData(navigationItemTaskData)
    };
}
