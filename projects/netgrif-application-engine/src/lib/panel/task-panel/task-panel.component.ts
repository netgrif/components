import {Component, Input, OnInit} from '@angular/core';
import {TaskPanelDefinition} from './task-panel-definition';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'nae-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

    @Input() taskPanelDefinition: TaskPanelDefinition;
    public showSpinner = false;
    public panelIcon: string;
    public panelIconField: string;
    public panelRef: MatExpansionPanel;

    constructor() {
    }

    ngOnInit() {
        this.panelIcon = this.taskPanelDefinition.panelIcon;
        this.panelIconField = this.taskPanelDefinition.panelIconField;
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

}
