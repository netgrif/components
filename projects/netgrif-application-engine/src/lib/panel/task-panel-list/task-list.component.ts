import {Component, Input, OnInit} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {Observable} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';


@Component({
    selector: 'nae-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    @Input() taskPanels: Array<TaskPanelData>;
    @Input() loading: boolean;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;

    constructor() {
    }

    ngOnInit() {
    }
}
