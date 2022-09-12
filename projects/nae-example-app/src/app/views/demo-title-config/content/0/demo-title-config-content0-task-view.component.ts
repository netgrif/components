import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory,
    defaultTaskSearchCategoriesFactory,
    InjectedTabbedTaskViewData,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    NAE_TASK_VIEW_CONFIGURATION,
    SearchService,
    tabbedAllowedNetsServiceFactory,
    tabbedTaskViewConfigurationFactory,
    TaskViewService,
    ViewIdService,
    ChangedFieldsService,
    AbstractTabbedTaskViewComponent
} from '@netgrif/components-core';
import {
    HeaderComponent,
} from '@netgrif/components';

const baseFilterFactory = (injectedTabData: InjectedTabbedTaskViewData) => {
    return {
        filter: injectedTabData.baseFilter
    };
};

@Component({
    selector: 'nae-app-demo-title-config-content0-task-view',
    templateUrl: './demo-title-config-content0-task-view.component.html',
    styleUrls: ['./demo-title-config-content0-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]},
        {   provide: AllowedNetsService,
            useFactory: tabbedAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_TAB_DATA]},
        {   provide: NAE_TASK_VIEW_CONFIGURATION,
            useFactory: tabbedTaskViewConfigurationFactory,
            deps: [NAE_TAB_DATA]},
        {   provide: ViewIdService, useValue: null},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class DemoTitleConfigContent0TaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
