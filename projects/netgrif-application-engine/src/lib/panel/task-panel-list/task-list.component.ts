import {Component, Input, OnInit} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';


@Component({
    selector: 'nae-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    @Input() taskPanels: Array<TaskPanelData>;
    @Input() loading: boolean;

    constructor() {
    }

    ngOnInit() {
    }
}
