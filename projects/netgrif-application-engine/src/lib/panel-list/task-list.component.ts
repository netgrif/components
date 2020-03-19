import {Component,  OnInit} from '@angular/core';
import {TaskPanelDefinition} from '../panel/task-panel/task-panel-definition';

export interface TaskPanel {
    header: TaskPanelDefinition;
    context: string;
}

@Component({
    selector: 'nae-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    taskPanels: TaskPanel[];

    constructor() {
    }

    ngOnInit() {
    }
}
