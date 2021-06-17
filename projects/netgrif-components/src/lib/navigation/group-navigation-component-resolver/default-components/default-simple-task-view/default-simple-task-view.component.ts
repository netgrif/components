import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    SearchService,
    AllowedNetsService,
    ViewIdService,
    AbstractTaskView,
    TaskViewService,
    CategoryFactory,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    NAE_SEARCH_CATEGORIES,
    navigationItemTaskFilterFactory,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory,
    navigationItemTaskCategoryFactory
} from '@netgrif/application-engine';
import {HeaderComponent} from '../../../../header/header.component';

@Component({
    selector: 'nc-default-simple-task-view',
    templateUrl: './default-simple-task-view.component.html',
    styleUrls: ['./default-simple-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        {   provide: ViewIdService, useValue: null},
        {
            provide: NAE_BASE_FILTER,
            useFactory: navigationItemTaskFilterFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: navigationItemTaskAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {   provide: NAE_SEARCH_CATEGORIES,
            useFactory: navigationItemTaskCategoryFactory,
            deps: [CategoryFactory, NAE_NAVIGATION_ITEM_TASK_DATA]
        },
    ]
})
export class DefaultSimpleTaskViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
