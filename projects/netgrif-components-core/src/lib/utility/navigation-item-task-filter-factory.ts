import {BaseFilter} from '../search/models/base-filter';
import {DataGroup} from '../resources/interface/data-groups';
import {FilterExtractionService} from '../navigation/utility/filter-extraction.service';
import {ActivatedRoute} from '@angular/router';
import {Filter} from '../filter/models/filter';

/**
 * Converts an {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token into {@link NAE_BASE_FILTER}
 * @param extractionService
 * @param activatedRoute
 * @param navigationItemTaskData a navigation item task containing the aggregated data representing a navigation item
 * @param filterData filter data to be used and combined in view
 */
export function navigationItemTaskFilterFactory(extractionService: FilterExtractionService,
                                                activatedRoute?: ActivatedRoute,
                                                navigationItemTaskData?: Array<DataGroup>,
                                                filterData?: Filter): BaseFilter {
    return {
        filter: extractionService.extractCompleteFilterFromData(navigationItemTaskData, activatedRoute, filterData)
    };
}
