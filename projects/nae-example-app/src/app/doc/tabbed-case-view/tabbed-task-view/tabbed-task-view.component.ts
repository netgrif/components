import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    BOOLEAN_VALUE_LABEL_ENABLED,
    CategoryFactory,
    defaultTaskSearchCategoriesFactory,
    InjectedTabbedTaskViewData,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    AbstractTabbedTaskViewComponent,
    TaskViewService,
    ViewIdService,
    NAE_BASE_FILTER,
    OverflowService,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    tabbedAllowedNetsServiceFactory,
    tabbedTaskViewConfigurationFactory,
    NAE_TASK_VIEW_CONFIGURATION,
    ChangedFieldsService, NAE_ASYNC_RENDERING_CONFIGURATION, HeaderSortingMode, NAE_HEADER_SORTING_MODE,
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';

interface ExampleInjectedTaskData extends InjectedTabbedTaskViewData {
    headerSortingMode: HeaderSortingMode;
}

const baseFilterFactory = (injectedTabData: InjectedTabbedTaskViewData) => {
    return {
        filter: injectedTabData.baseFilter
    };
};

const headerSortingModeFactory = (injectedTabData: ExampleInjectedTaskData): HeaderSortingMode => {
    return injectedTabData.headerSortingMode;
};

@Component({
    selector: 'nae-app-tabbed-task-view',
    templateUrl: './tabbed-task-view.component.html',
    styleUrls: ['./tabbed-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        OverflowService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: tabbedAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_TAB_DATA]
        },
        {
            provide: BOOLEAN_VALUE_LABEL_ENABLED,
            useValue: true
        },
        {   provide: ViewIdService, useValue: null},
        {   provide: NAE_TASK_VIEW_CONFIGURATION,
            useFactory: tabbedTaskViewConfigurationFactory,
            deps: [NAE_TAB_DATA]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
        {provide: NAE_HEADER_SORTING_MODE, useFactory: headerSortingModeFactory, deps: [NAE_TAB_DATA]},
    ]
})
export class TabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: ExampleInjectedTaskData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
