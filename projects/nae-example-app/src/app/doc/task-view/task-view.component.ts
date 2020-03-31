import {Component} from '@angular/core';
import {AbstractTaskView, TaskViewService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss'],
    providers: [TaskViewService]
})
export class TaskViewComponent extends AbstractTaskView {

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

}
