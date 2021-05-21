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
    defaultTaskSearchCategoriesFactory,
    filterCaseFilterFactory,
    NAE_FILTER_CASE,
    filterCaseAllowedNetsServiceFactory
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
        {
            provide: NAE_BASE_FILTER,
            useFactory: filterCaseFilterFactory,
            deps: [NAE_FILTER_CASE]
        },
        {
            provide: AllowedNetsService,
            useFactory: filterCaseAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_FILTER_CASE]
        },
        {provide: ViewIdService, useValue: null},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
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
