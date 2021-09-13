import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    BaseAllowedNetsService,
    Category,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskFilterFactory,
    navigationItemTaskCategoryFactory, CategoryResolverService
} from '@netgrif/application-engine';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';
import {Type} from '@angular/core';

/**
 * Converts a navigation item case task data injected by the {@link NAE_TAB_DATA} injection token into a {@link BaseFilter} instance
 * @param tabData the injected data containing the navigation item case task data
 */
export function filterCaseTabbedDataFilterFactory(tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData): BaseFilter {
    return navigationItemTaskFilterFactory(tabData.navigationItemTaskData);
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

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, baseAllowedNets, tabData.navigationItemTaskData);
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
        defaultCaseSearchCategories,
        defaultTaskSearchCategories);
}
