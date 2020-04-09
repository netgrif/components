import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AbstractTaskView, HeaderComponent, TaskViewService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
    providers: [TaskViewService]
})
export class TaskViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService, '{}');
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
