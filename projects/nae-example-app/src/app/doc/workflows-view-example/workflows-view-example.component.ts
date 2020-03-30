import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-workflows-view-example',
    templateUrl: './workflows-view-example.component.html',
    styleUrls: ['./workflows-view-example.component.scss']
})
export class WorkflowsViewExampleComponent implements OnInit {
    readonly TITLE = 'Workflows view';
    readonly DESCRIPTION = 'Ukážka použitia workflows view...';
    constructor() {
    }

    ngOnInit(): void {
    }

}
