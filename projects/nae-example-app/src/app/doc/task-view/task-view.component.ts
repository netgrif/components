import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    ConfigTaskViewServiceFactory,
    SearchService,
    SimpleFilter,
    TaskEventNotification,
    TaskViewService
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';

const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('case');
};

const searchServiceFactory = () => {
    // TODO load/use base filter somehow
    return new SearchService(SimpleFilter.emptyTaskFilter());
};

@Component({
    selector: 'nae-app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
    providers: [
        ConfigTaskViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
        {   provide: TaskViewService,
            useFactory: localTaskViewServiceFactory,
            deps: [ConfigTaskViewServiceFactory]},
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
