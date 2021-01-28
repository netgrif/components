import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    ConfigTaskViewServiceFactory,
    SearchService,
    SimpleFilter,
    TaskEventNotification,
    TaskViewService,
    Task,
    NAE_DEFAULT_HEADERS,
    NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    CategoryFactory, NAE_SEARCH_CATEGORIES, defaultTaskSearchCategoriesFactory
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('case');
};

const searchServiceFactory = () => {
    // TODO load/use base filter somehow
    return new SearchService(SimpleFilter.emptyTaskFilter());
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
            return true;
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
        ConfigTaskViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: TaskViewService,
            useFactory: localTaskViewServiceFactory,
            deps: [ConfigTaskViewServiceFactory]},
        {   provide: NAE_DEFAULT_HEADERS, useValue: [
                'meta-case', 'meta-title', 'meta-priority', 'meta-priority',
                'meta-user', 'all_data-number', 'all_data-text'
            ]},
        {   provide: NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
            useFactory: disableButtonsFactory
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'task'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
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
