import { Component, OnInit } from '@angular/core';
import {TaskPanelDefinition} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-panel-example',
  templateUrl: './panel-example.component.html',
  styleUrls: ['./panel-example.component.scss']
})
export class PanelExampleComponent implements OnInit {
    TITLE: string;
    DESCRIPTION: string;
    taskPanelDef: TaskPanelDefinition;

    constructor() {
        this.TITLE = 'Task Panel Component';
        this.DESCRIPTION = 'Description';
        this.taskPanelDef = {featuredFields : [], panelIcon: 'home', panelIconField: 'home'};
    }

    ngOnInit(): void {
    }

}
