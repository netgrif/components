import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AbstractTaskView, FilterType, HeaderComponent, SearchService, SimpleFilter, TaskViewService} from '@netgrif/application-engine';

const searchServiceFactory = () => {
    // TODO load/use base filter somehow
    return new SearchService(new SimpleFilter('', FilterType.TASK, {}));
};

@Component({
    selector: 'nae-app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
    providers: [
        TaskViewService,
        {   provide: SearchService,
            useFactory: searchServiceFactory},
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
}
