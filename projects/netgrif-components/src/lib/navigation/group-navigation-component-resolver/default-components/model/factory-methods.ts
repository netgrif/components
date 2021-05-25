import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    Category,
    CategoryFactory,
    filterCaseAllowedNetsServiceFactory,
    filterCaseFilterFactory,
    filterCaseSearchCategoriesFactory
} from '@netgrif/application-engine';
import {InjectedTabbedCaseViewDataWithFilterCase} from './injected-tabbed-case-view-data-with-filter-case';


export function filterCaseTabbedDataFilterFactory(tabData: InjectedTabbedCaseViewDataWithFilterCase): BaseFilter {
    return filterCaseFilterFactory(tabData.filterCase);
}

export function filterCaseTabbedDataAllowedNetsServiceFactory(allowedNetsServiceFactory: AllowedNetsServiceFactory,
                                                              tabData: InjectedTabbedCaseViewDataWithFilterCase): AllowedNetsService {
    return filterCaseAllowedNetsServiceFactory(allowedNetsServiceFactory, tabData.filterCase);
}

export function filterCaseTabbedDataSearchCategoriesFactory(categoryFactory: CategoryFactory,
                                                            tabData: InjectedTabbedCaseViewDataWithFilterCase): Array<Category<any>> {
    return filterCaseSearchCategoriesFactory(categoryFactory, tabData.filterCase);
}
