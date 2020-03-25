import { Component, OnInit } from '@angular/core';
import {DataField, FieldConvertorService, TaskPanelDefinition} from '@netgrif/application-engine';
import {TaskJsonResourceService} from '../../task-json-resource.service';

@Component({
  selector: 'nae-app-panel-example',
  templateUrl: './panel-example.component.html',
  styleUrls: ['./panel-example.component.scss']
})
export class PanelExampleComponent implements OnInit {
    TITLE: string;
    DESCRIPTION: string;
    taskPanelDef: TaskPanelDefinition;
    resources: any;

    constructor(private taskService: TaskJsonResourceService, private fieldConvertorService: FieldConvertorService) {
        this.TITLE = 'Task Panel Component';
        this.DESCRIPTION = 'Description';
        this.taskPanelDef = {featuredFields : [], panelIcon: 'home', panelIconField: 'home'};
        this.getTaskDataFields();
    }

    ngOnInit(): void {
    }

    getTaskDataFields() {
        this.taskService.getData('5e7a0cd89ceec71789c2bc68').subscribe(dataGroups => {
            this.resources = [];
            dataGroups.forEach(group => {
                const dataGroup: DataField<any>[] = [];
                if (group.fields._embedded) {
                    Object.keys(group.fields._embedded).forEach(item => {
                        dataGroup.push(...group.fields._embedded[item].map(df => this.fieldConvertorService.toClass(df)));
                    });
                }
                this.resources.push({
                    fields: dataGroup,
                    stretch: group.stretch,
                    title: group.title,
                    cols: group.cols,
                    alignment: group.alignment
                });
            });

        });
    }
}
