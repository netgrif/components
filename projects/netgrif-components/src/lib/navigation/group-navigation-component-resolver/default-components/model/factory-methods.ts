import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    BaseAllowedNetsService,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskFilterFactory,
    FilterType,
    FilterExtractionService, GroupNavigationConstants
} from '@netgrif/components-core';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';
import {ActivatedRoute} from '@angular/router';

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into a {@link BaseFilter} instance
 * @param extractionService
 * @param tabData the injected data containing the navigation item case task data
 * @param activatedRoute
 */
export function filterCaseTabbedDataFilterFactory(extractionService: FilterExtractionService,
                                                  tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                  activatedRoute: ActivatedRoute): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, activatedRoute, tabData.navigationItemTaskData, tabData.loadFilter, FilterType.CASE);
}

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into an {@link AllowedNetsService}
 * instance
 * @param allowedNetsServiceFactory
 * @param baseAllowedNets
 * @param tabData the injected data containing the navigation item case task data
 */
export function filterCaseTabbedDataAllowedNetsServiceFactory(allowedNetsServiceFactory: AllowedNetsServiceFactory,
                                                              baseAllowedNets: BaseAllowedNetsService,
                                                              tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData)
    : AllowedNetsService {

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, baseAllowedNets, true, tabData.navigationItemTaskData);
}
