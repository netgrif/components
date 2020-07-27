import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-workflows-view-example',
    templateUrl: './workflow-view-example.component.html',
    styleUrls: ['./workflow-view-example.component.scss']
})
export class WorkflowViewExampleComponent implements OnInit {
    readonly TITLE = 'Workflows view';
    readonly DESCRIPTION = 'Ukážka použitia workflow view...';
    constructor() {
    }

    ngOnInit(): void {
    }

}
