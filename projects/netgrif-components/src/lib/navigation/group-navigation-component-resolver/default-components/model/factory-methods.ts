import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    BaseAllowedNetsService,
    Category,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskFilterFactory,
    navigationItemTaskCategoryFactory, CategoryResolverService, FilterExtractionService, GroupNavigationConstants
} from '@netgrif/components-core';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';
import {Type} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into a {@link BaseFilter} instance
 * @param extractionService
 * @param tabData the injected data containing the navigation item case task data
 * @param activatedRoute
 * @param filterFieldId id of the filter field
 */
export function filterCaseTabbedDataFilterFactory(extractionService: FilterExtractionService,
                                                  tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                  activatedRoute: ActivatedRoute): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, activatedRoute, tabData.navigationItemTaskData);
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

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, baseAllowedNets, tabData.navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER);
}

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into an array of {@link Category} classes
 * @param categoryResolverService
 * @param tabData the injected data containing the navigation item case task data
 * @param defaultCaseSearchCategories the default case search categories
 * @param defaultTaskSearchCategories the default task search categories
 */
export function filterCaseTabbedDataSearchCategoriesFactory(categoryResolverService: CategoryResolverService,
                                                            tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                                                            defaultCaseSearchCategories: Array<Type<Category<any>>>,
                                                            defaultTaskSearchCategories: Array<Type<Category<any>>>)
    : Array<Type<Category<any>>> {

    return navigationItemTaskCategoryFactory(categoryResolverService,
        tabData.navigationItemTaskData,
        GroupNavigationConstants.ITEM_FIELD_CASE_FILTER,
        defaultCaseSearchCategories,
        defaultTaskSearchCategories);
}
