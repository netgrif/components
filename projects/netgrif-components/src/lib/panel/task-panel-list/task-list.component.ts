import {Component} from '@angular/core';
import {AbstractTaskListComponent, LoggerService, TaskViewService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends AbstractTaskListComponent {
    constructor(protected _taskViewService: TaskViewService, protected _log: LoggerService) {
        super(_taskViewService, _log);
    }
}
