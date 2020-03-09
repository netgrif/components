import {Component, Input, OnInit, Type} from '@angular/core';
import {TaskPanelDefinition} from "./task-panel-definition";
import {MatExpansionPanel} from "@angular/material/expansion";
import {ComponentPortal} from "@angular/cdk/portal";
import {TaskPanelContentComponent} from "./task-panel-content/task-panel-content.component";

@Component({
  selector: 'nae-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

    @Input() resources: string;
    @Input() taskPanelDefinition: TaskPanelDefinition;
    @Input() panelContentComponent: Type<any>;

    public portal: ComponentPortal<any>;
    public showSpinner = false;
    public panelIcon: string;
    public panelIconField: string;
    public panelRef: MatExpansionPanel;

    constructor() {
    }

    ngOnInit() {
        this.panelIcon = this.taskPanelDefinition.panelIcon;
        this.panelIconField = this.taskPanelDefinition.panelIconField;
        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskPanelContentComponent);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent);
        }
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef
    }

}
