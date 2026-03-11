import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskViewComponent, CategoryFactory,
    defaultTaskSearchCategoriesFactory, NAE_SEARCH_CATEGORIES,
    SearchService,
    SimpleFilter, TaskSearchCaseQuery,
    TaskViewService, NAE_BASE_FILTER, AllowedNetsService, AllowedNetsServiceFactory, NAE_VIEW_ID_SEGMENT, ViewIdService,
    ChangedFieldsService, UserService
} from '@netgrif/components-core';
import {
    HeaderComponent,
} from '@netgrif/components';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromConfig('group-view');
};

const baseFilterFactory = (userService: UserService) => {
    const groupIds: Array<TaskSearchCaseQuery> = [];
    userService.user.groups.forEach(group => {
        groupIds.push({id: group.id});
    });
    return {
        filter: SimpleFilter.fromTaskQuery({case: groupIds})
    };
};

@Component({
    selector: 'nae-app-group-view-group-view',
    templateUrl: './group-view.component.html',
    styleUrls: ['./group-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [UserService]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'group'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class GroupViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);

    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
