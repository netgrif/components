import {BaseFilter} from '../search/models/base-filter';
import {DataGroup} from '../resources/interface/data-groups';
import {FilterExtractionService} from '../navigation/utility/filter-extraction.service';
import {Filter} from '../filter/models/filter';
import {ActivatedRoute} from '@angular/router';
import {FilterType} from "../filter/models/filter-type";

/**
 * Converts an {@link NAE_NAVIGATION_ITEM_TASK_DATA} injection token into {@link NAE_BASE_FILTER}
 * @param extractionService
 * @param filterFieldId id of the filter field
 * @param activatedRoute
 * @param navigationItemTaskData a navigation item task containing the aggregated data representing a navigation item
 * @param filterData filter to be merged with
 */
export function navigationItemTaskFilterFactory(extractionService: FilterExtractionService,
                                                filterFieldId?: string,
                                                activatedRoute?: ActivatedRoute,
                                                navigationItemTaskData?: Array<DataGroup>,
                                                filterData?: Filter,
                                                filterType?: FilterType): BaseFilter {
    return {
        filter: extractionService.extractCompleteFilterFromData(navigationItemTaskData, activatedRoute, filterData, filterFieldId, filterType)
    };
}
