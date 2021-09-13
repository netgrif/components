import {BaseFilter} from '../search/models/base-filter';
import {NAE_NAVIGATION_ITEM_TASK_DATA} from '../navigation/model/filter-case-injection-token';
import {extractFilterFromData} from '../navigation/utility/navigation-item-task-utility-methods';
import {DataGroup} from '../resources/interface/data-groups';

/**
 * Converts an {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token into {@link NAE_BASE_FILTER}
 * @param navigationItemTaskData a navigation item task containing the aggregated data representing a navigation item
 */
export function navigationItemTaskFilterFactory(navigationItemTaskData: Array<DataGroup>): BaseFilter {
    return {
        filter: extractFilterFromData(navigationItemTaskData)
    };
}
