import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    SearchService,
    SimpleFilter,
    TaskEventNotification,
    TaskViewService,
    Task,
    NAE_DEFAULT_HEADERS,
    NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    CategoryFactory,
    NAE_SEARCH_CATEGORIES,
    defaultTaskSearchCategoriesFactory,
    NAE_ASYNC_RENDERING_CONFIGURATION,
    NAE_BASE_FILTER,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    ChangedFieldsService
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyTaskFilter()
    };
};

const disableButtonsFactory = () => {
    return {
        finish: (t: Task) => {
            if (t && t.dataGroups && t.dataGroups.length) {
                for (const dg of t.dataGroups) {
                    const fld = dg.fields.find(field => field.title === 'Boolean');
                    if (fld) {
                        return fld.value;
                    }
                }
            }
            return false;
        },
        delegate: (t: Task) => true,
    };
};

@Component({
    selector: 'nae-app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {   provide: NAE_DEFAULT_HEADERS, useValue: [
                'meta-case', 'meta-title', 'meta-priority', 'meta-priority',
                'meta-user', 'all_data-number', 'all_data-text'
            ]},
        {   provide: NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
            useFactory: disableButtonsFactory
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'all-tasks'},
        ViewIdService,
        {   provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
        {   provide: NAE_ASYNC_RENDERING_CONFIGURATION,
            useValue: {enableAsyncRenderingForNewFields: false, enableAsyncRenderingOnTaskExpand: false}}
    ]
})
export class TaskViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }
}
