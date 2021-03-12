import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    TaskViewServiceFactory, BOOLEAN_VALUE_LABEL_ENABLED, CategoryFactory, defaultTaskSearchCategoriesFactory,
    InjectedTabbedTaskViewData, NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    TabbedTaskView,
    tabbedTaskViewServiceFactory,
    TaskViewService,
    ViewIdService, NAE_BASE_FILTER
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const baseFilterFactory = (injectedTabData: InjectedTabbedTaskViewData) => {
    return {
        filter: injectedTabData.baseFilter
    };
};

@Component({
    selector: 'nae-app-tabbed-task-view',
    templateUrl: './tabbed-task-view.component.html',
    styleUrls: ['./tabbed-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewServiceFactory,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: TaskViewService,
            useFactory: tabbedTaskViewServiceFactory,
            deps: [TaskViewServiceFactory, NAE_TAB_DATA]
        },
        {
            provide: BOOLEAN_VALUE_LABEL_ENABLED,
            useValue: true
        },
        {   provide: ViewIdService, useValue: null},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class TabbedTaskViewComponent extends TabbedTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
