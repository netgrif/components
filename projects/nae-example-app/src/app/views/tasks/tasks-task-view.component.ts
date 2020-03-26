import {Component} from '@angular/core';
import {TaskResourceService, AbstractTaskView} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-tasks-task-view',
    templateUrl: './tasks-task-view.component.html',
    styleUrls: ['./tasks-task-view.component.scss']
})
export class TasksTaskViewComponent extends AbstractTaskView {

    constructor(taskService: TaskResourceService) {
        super(taskService);
    }
}
