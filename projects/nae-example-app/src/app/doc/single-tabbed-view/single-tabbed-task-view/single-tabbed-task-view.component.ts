import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    AbstractTabbedTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BOOLEAN_VALUE_LABEL_ENABLED,
    CategoryFactory,
    ChangedFieldsService,
    defaultTaskSearchCategoriesFactory,
    InjectedTabbedTaskViewData,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    NAE_TASK_FORCE_OPEN,
    NAE_TASK_VIEW_CONFIGURATION,
    OverflowService,
    SearchService,
    tabbedAllowedNetsServiceFactory,
    tabbedTaskViewConfigurationFactory,
    TaskViewService,
    ViewIdService
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';

const baseFilterFactory = (injectedTabData: InjectedTabbedTaskViewData) => {
    return {
        filter: injectedTabData.baseFilter
    };
};

@Component({
    selector: 'nae-app-single-tabbed-task-view',
    templateUrl: './single-tabbed-task-view.component.html',
    styleUrls: ['./single-tabbed-task-view.component.scss'],
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
        {provide: ViewIdService, useValue: null},
        {
            provide: NAE_TASK_VIEW_CONFIGURATION,
            useFactory: tabbedTaskViewConfigurationFactory,
            deps: [NAE_TAB_DATA]
        },
        {provide: NAE_TASK_FORCE_OPEN, useValue: true},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]}
    ]
})
export class SingleTabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
