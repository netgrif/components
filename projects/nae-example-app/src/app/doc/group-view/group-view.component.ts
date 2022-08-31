import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskViewComponent, CategoryFactory,
    defaultTaskSearchCategoriesFactory, NAE_SEARCH_CATEGORIES, NextGroupService,
    SearchService,
    SimpleFilter, TaskSearchCaseQuery,
    TaskViewService, NAE_BASE_FILTER, AllowedNetsService, AllowedNetsServiceFactory, NAE_VIEW_ID_SEGMENT, ViewIdService,
    ChangedFieldsService
} from '@netgrif/components-core';
import {
    HeaderComponent,
} from '@netgrif/components';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromConfig('group-view');
};

const baseFilterFactory = (nextGroupService: NextGroupService) => {
    const groupIds: Array<TaskSearchCaseQuery> = [];
    nextGroupService.groupOfUser.forEach(group => {
        groupIds.push({id: group.stringId});
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
            deps: [NextGroupService]
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
