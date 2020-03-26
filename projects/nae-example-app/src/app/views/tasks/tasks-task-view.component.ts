import {Component, OnInit} from '@angular/core';
import {AbstractTaskJsonResourceService, AbstractTaskView} from '@netgrif/application-engine';
import {TaskExampleAppService} from './task-example-app.service';



@Component({
    selector: 'nae-app-tasks-task-view',
    templateUrl: './tasks-task-view.component.html',
    styleUrls: ['./tasks-task-view.component.scss'],
    providers: [{provide: AbstractTaskJsonResourceService, useClass: TaskExampleAppService}]
})
export class TasksTaskViewComponent extends AbstractTaskView {

    constructor(protected _taskService: AbstractTaskJsonResourceService) {
        super(_taskService);
    }
}
