import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    Category,
    CategoryFactory,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskFilterFactory,
    navigationItemTaskCategoryFactory
} from '@netgrif/application-engine';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from './injected-tabbed-case-view-data-with-navigation-item-task-data';


export function filterCaseTabbedDataFilterFactory(tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData): BaseFilter {
    return navigationItemTaskFilterFactory(tabData.navigationItemTaskData);
}

export function filterCaseTabbedDataAllowedNetsServiceFactory(allowedNetsServiceFactory: AllowedNetsServiceFactory,
                                                              tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData)
    : AllowedNetsService {

    return navigationItemTaskAllowedNetsServiceFactory(allowedNetsServiceFactory, tabData.navigationItemTaskData);
}

export function filterCaseTabbedDataSearchCategoriesFactory(categoryFactory: CategoryFactory,
                                                            tabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData)
    : Array<Category<any>> {

    return navigationItemTaskCategoryFactory(categoryFactory, tabData.navigationItemTaskData);
}
