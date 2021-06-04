import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    TaskViewServiceFactory,
    CategoryFactory,
    defaultTaskSearchCategoriesFactory,
    InjectedTabbedTaskViewData,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    TabbedTaskView,
    tabbedTaskViewServiceFactory,
    TaskViewService,
    ViewIdService,
} from 'netgrif-application-engine';
import {
    HeaderComponent,
} from 'netgrif-components';

const searchServiceFactory = (injectedTabData: InjectedTabbedTaskViewData) => {
    return new SearchService(injectedTabData.baseFilter);
};

@Component({
    selector: 'nae-app-demo-title-config-content0-task-view',
    templateUrl: './demo-title-config-content0-task-view.component.html',
    styleUrls: ['./demo-title-config-content0-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [NAE_TAB_DATA]},
        {   provide: TaskViewService,
            useFactory: tabbedTaskViewServiceFactory,
            deps: [TaskViewServiceFactory, NAE_TAB_DATA]},
        {   provide: ViewIdService, useValue: null},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class DemoTitleConfigContent0TaskViewComponent extends TabbedTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
