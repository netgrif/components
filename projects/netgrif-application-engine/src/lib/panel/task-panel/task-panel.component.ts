import {Component, Input, OnInit} from '@angular/core';
import {TaskPanelDefinition} from "./task-panel-definition";

@Component({
  selector: 'nae-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

    @Input() taskPanelDefinition: TaskPanelDefinition;
    showSpinner = false;
    panelIcon: string;
    panelIconField: string;


    ngOnInit() {
        this.panelIcon = this.taskPanelDefinition.panelIcon;
        this.panelIconField = this.taskPanelDefinition.panelIconField;
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

}
