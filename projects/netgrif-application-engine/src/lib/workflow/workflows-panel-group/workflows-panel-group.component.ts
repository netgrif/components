import {Component, OnInit} from '@angular/core';
import {PanelsDataGroup, WorkflowsPanelGroupService} from './services/workflows-panel-group.service';



@Component({
    selector: 'nae-workflows-panel-group',
    templateUrl: './workflows-panel-group.component.html',
    styleUrls: ['./workflows-panel-group.component.scss']
})
export class WorkflowsPanelGroupComponent implements OnInit {

    constructor(public workflowPanelGroupService: WorkflowsPanelGroupService) {
    }

    ngOnInit(): void {
    }

}
