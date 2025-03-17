import {Component, OnInit} from '@angular/core';
import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    FilterRepository,
    MergeOperator,
    NAE_BASE_FILTER,
    NAE_NEW_CASE_COMPONENT,
    NAE_NEW_CASE_CONFIGURATION,
    NAE_SEARCH_CATEGORIES,
    NAE_VIEW_ID_SEGMENT,
    SearchService,
    SimpleFilter,
    UserService,
    ViewIdService
} from '@netgrif/components-core';
import {NewCaseComponent} from '@netgrif/components';
import {
    SingleTabbedCaseViewComponent
} from '../single-tabbed-view/single-tabbed-case-view/single-tabbed-case-view.component';
import {
    SingleTabbedTaskViewComponent
} from '../single-tabbed-view/single-tabbed-task-view/single-tabbed-task-view.component';

export const newCaseConfigFactory = () => {
    return {useCachedProcesses: false};
};

export const dashboardAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromArray(['dashboard']);
};

const baseFilterFactory = (filterRepository: FilterRepository, userService: UserService) => {
    const filter = SimpleFilter.fromCaseQuery({process: {identifier: 'dashboard'}})
        .merge(SimpleFilter.fromCaseQuery({author: {email: userService.user.email}}), MergeOperator.AND);
    return {filter};
};

@Component({
    selector: 'nae-app-dashboard-case-example',
    templateUrl: './dashboard-case-example.component.html',
    styleUrls: ['./dashboard-case-example.component.scss'],
    providers: [
        {
            provide: NAE_NEW_CASE_CONFIGURATION,
            useFactory: newCaseConfigFactory,
            deps: []
        },
        CategoryFactory,
        CaseViewService,
        SearchService,
        ViewIdService,
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'my-dashboards'
        },
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: defaultCaseSearchCategoriesFactory,
            deps: [CategoryFactory]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [FilterRepository, UserService]
        },
        {
            provide: AllowedNetsService,
            useFactory: dashboardAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {
            provide: NAE_NEW_CASE_COMPONENT,
            useValue: NewCaseComponent
        }
    ],
    standalone: false
})
export class DashboardCaseExampleComponent implements OnInit {

    public tabs = [];

    constructor(public userService: UserService) {
        const filter = SimpleFilter.fromCaseQuery({process: {identifier: 'dashboard'}}).merge(
            SimpleFilter.fromCaseQuery({author: {email: userService.user.email}}), MergeOperator.AND
        );
        this.tabs = [
            {
                label: {
                    text: 'My dashboards',
                },
                canBeClosed: false,
                tabContentComponent: SingleTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: SingleTabbedTaskViewComponent,
                    loadFilter: filter,
                    tabViewOrder: 0,
                    shouldUseCache: false
                }
            },
        ]
    }

    ngOnInit(): void {
    }

}
