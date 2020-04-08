import {Component, OnInit} from '@angular/core';
import {WorkflowPanelGroupService} from './services/workflow-panel-group.service';


@Component({
    selector: 'nae-workflow-panel-group',
    templateUrl: './workflow-panel-group.component.html',
    styleUrls: ['./workflow-panel-group.component.scss']
})
export class WorkflowPanelGroupComponent implements OnInit {

    constructor(public workflowPanelGroupService: WorkflowPanelGroupService) {
    }

    ngOnInit(): void {
    }

}
