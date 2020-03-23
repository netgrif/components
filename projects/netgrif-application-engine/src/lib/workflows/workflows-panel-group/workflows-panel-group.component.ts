import {Component, OnInit} from '@angular/core';
import {WorkflowsPanelGroupService} from "./services/workflows-panel-group.service";
import {TextField} from "../../data-fields/text-field/models/text-field";
import {WorkflowsPanelContent} from "../../panel/workflows-panel/models/workflows-panel-content";
import {Behavior} from "../../data-fields/models/behavior";
//TODO change uploaded to DateTimeField
interface PanelsDataGroup {
    netIdentifier: TextField,
    title: TextField,
    version: TextField,
    author: TextField,
    uploaded: TextField
}

@Component({
    selector: 'nae-workflows-panel-group',
    templateUrl: './workflows-panel-group.component.html',
    styleUrls: ['./workflows-panel-group.component.scss']
})
export class WorkflowsPanelGroupComponent implements OnInit {

    public panelsDataGroup: Map<string, PanelsDataGroup>;
    private dataFieldsBehaviour: Behavior = {visible: true, editable: false};

    constructor(public workflowPanelGroupService: WorkflowsPanelGroupService) {
    }

    ngOnInit(): void {
        this.panelsDataGroup = new Map<string, PanelsDataGroup>();
        this.workflowPanelGroupService.workflowPanelDefinitions.forEach(panel => {
            this.panelsDataGroup.set(
                panel.panelContent.netIdentifier,this.populatePanelDataGroup(panel.panelContent)
            )
        });
    }

    /**
     * Populate data fields group for every petri net model
     * @param panelContent Meta information's about Petri net model
     */
    //TODO change uploaded to DateTimeField
    private populatePanelDataGroup(panelContent: WorkflowsPanelContent): PanelsDataGroup {
        return {
            netIdentifier: new TextField('','Net identifier', panelContent.netIdentifier, this.dataFieldsBehaviour),
            title: new TextField('','Title', panelContent.title, this.dataFieldsBehaviour),
            version: new TextField('','Version', panelContent.version, this.dataFieldsBehaviour),
            author: new TextField('','Author', panelContent.author, this.dataFieldsBehaviour),
            uploaded: new TextField('','Uploaded', 'datumik', this.dataFieldsBehaviour)
        };
    }

}
