import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CategoryFactory,
    SearchService,
    NAE_BASE_FILTER,
    AllowedNetsService,
    NAE_SEARCH_CATEGORIES,
    CaseViewService,
    AllowedNetsServiceFactory,
    TabbedCaseView,
    NAE_TAB_DATA,
    LoggerService,
    SavedFilterMetadata,
    ViewIdService,
    CategoryResolverService,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    BaseAllowedNetsService
} from '@netgrif/application-engine';
import {HeaderComponent} from '../../../../header/header.component';
import {InjectedTabbedCaseViewDataWithNavigationItemTaskData} from '../model/injected-tabbed-case-view-data-with-navigation-item-task-data';
import {
    filterCaseTabbedDataAllowedNetsServiceFactory,
    filterCaseTabbedDataFilterFactory,
    filterCaseTabbedDataSearchCategoriesFactory
} from '../model/factory-methods';
import {UserService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-default-tabbed-case-view',
    templateUrl: './default-tabbed-case-view.component.html',
    styleUrls: ['./default-tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        ViewIdService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: filterCaseTabbedDataFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: filterCaseTabbedDataAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, NAE_TAB_DATA]
        },
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: filterCaseTabbedDataSearchCategoriesFactory,
            deps: [CategoryResolverService, NAE_TAB_DATA, NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES]
        },
    ]
})
export class DefaultTabbedCaseViewComponent extends TabbedCaseView implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData,
                userService: UserService) {
        super(caseViewService, loggerService, injectedTabData, userService);
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

    loadFilter(filterData: SavedFilterMetadata) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: filterData.filter.title
            },
            canBeClosed: true,
            tabContentComponent: DefaultTabbedCaseViewComponent,
            injectedObject: {...this._injectedTabData, filterCase: filterData.filterCase},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

}
