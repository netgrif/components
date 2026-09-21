import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {
    SearchService,
    AllowedNetsService,
    ViewIdService,
    AbstractTaskViewComponent,
    TaskViewService,
    CategoryFactory,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    NAE_SEARCH_CATEGORIES,
    navigationItemTaskFilterFactory,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskCategoryFactory,
    NAE_VIEW_ID_SEGMENT,
    groupNavigationViewIdSegmentFactory,
    CategoryResolverService,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES, BaseAllowedNetsService, FilterExtractionService,
    ChangedFieldsService
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nc-default-simple-task-view',
    templateUrl: './default-simple-task-view.component.html',
    styleUrls: ['./default-simple-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ViewIdService,
        ChangedFieldsService,
        {   provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
        {
            provide: NAE_BASE_FILTER,
            useFactory: navigationItemTaskFilterFactory,
            deps: [FilterExtractionService, ActivatedRoute, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {
            provide: AllowedNetsService,
            useFactory: navigationItemTaskAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {   provide: NAE_SEARCH_CATEGORIES,
            useFactory: navigationItemTaskCategoryFactory,
            deps: [
                CategoryResolverService,
                [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA],
                [new Optional(), NAE_DEFAULT_CASE_SEARCH_CATEGORIES],
                [new Optional(), NAE_DEFAULT_TASK_SEARCH_CATEGORIES]
            ]
        },
    ]
})
export class DefaultSimpleTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    public searchEnabled: boolean = true;

    constructor(taskViewService: TaskViewService, activatedRoute: ActivatedRoute) {
        super(taskViewService);
        if (!!activatedRoute.snapshot.paramMap.get('singleCaseId')) {
            this.searchEnabled = false;
        }
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
