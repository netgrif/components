import {Component, Input, OnInit} from '@angular/core';
import {WorkflowPanelDefinition} from './models/workflows-panels-definition';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
    selector: 'nae-workflows-panel',
    templateUrl: './workflows-panel.component.html',
    styleUrls: ['./workflows-panel.component.scss']
})
export class WorkflowsPanelComponent implements OnInit {

    @Input() workflowPanelDefinition: WorkflowPanelDefinition;
    public panelRef: MatExpansionPanel;
    panelIcon: string;
    panelIconField: string;


    constructor() {
    }

    ngOnInit() {
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    public collapse() {
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

}
