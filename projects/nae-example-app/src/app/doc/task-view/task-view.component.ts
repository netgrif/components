import { Component } from '@angular/core';
import {AbstractTaskView, TaskResourceService} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent extends AbstractTaskView {

    constructor(taskService: TaskResourceService) {
        super(taskService);
    }

}
