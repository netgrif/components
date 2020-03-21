import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-task-header-example',
    templateUrl: './task-header-example.component.html',
    styleUrls: ['./task-header-example.component.scss']
})
export class TaskHeaderExampleComponent implements OnInit {
    readonly TITLE = 'Task header';
    readonly DESCRIPTION = 'Ukážka použitia task headeru...';
    constructor() {
    }

    ngOnInit(): void {
    }

}
