import {Component, OnInit} from '@angular/core';
import {
    Count,
    DataGroup,
    DataGroupsResource,
    MessageResource,
    Task,
    DataField,
    FieldConvertorService
} from '@netgrif/application-engine';
import {TaskJsonResourceService} from '../../task-json-resource.service';
import {TaskPanelDefinition} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-task-resource-example',
    templateUrl: './task-resource-example.component.html',
    styleUrls: ['./task-resource-example.component.scss']
})
export class TaskResourceExampleComponent implements OnInit {

    countvalue: Count = undefined;
    getAllTaskData: Array<Task> = undefined;
    getTaskData: MessageResource = undefined;
    deletetaskData: MessageResource = undefined;
    taskData: Array<DataGroupsResource> = undefined;
    taskDataGroups: Array<DataGroup> = undefined;
    taskPanelDef: TaskPanelDefinition;

    constructor(private taskJsonResourceService: TaskJsonResourceService, private fieldConvertorService: FieldConvertorService) {
        this.taskPanelDef = {featuredFields: [], panelIcon: 'home', panelIconField: 'home'};
    }

    ngOnInit(): void {
    }

    count() {
        this.taskJsonResourceService.countTask({}).subscribe(count => {
            console.log(count);
            this.countvalue = count;
        });
    }

    getAllTask() {
        this.taskJsonResourceService.getAllTask().subscribe(tasks => {
            console.log(tasks);
            this.getAllTaskData = tasks;
        });
    }

    assignTask() {
        this.taskJsonResourceService.assignTask('5e7a0cd89ceec71789c2bc68').subscribe(task => {
            console.log(task);
            this.getTaskData = task;
        });
    }

    cancelTask() {
        this.taskJsonResourceService.cancelTask('5e7a0cd89ceec71789c2bc68').subscribe(task => {
            console.log(task);
            this.deletetaskData = task;
        });
    }

    getDataTask() {
        this.taskJsonResourceService.getData('5e7a0cd89ceec71789c2bc68').subscribe(task => {
            console.log(task);
            this.taskData = task;
        });
    }

    getTaskDataFields() {
        this.taskJsonResourceService.getData('5e7b171d9ceec7242f0e068f').subscribe(dataGroups => {
            this.taskDataGroups = [];
            dataGroups.forEach(group => {
                const dataGroup: DataField<any>[] = [];
                if (group.fields._embedded) {
                    Object.keys(group.fields._embedded).forEach(item => {
                        dataGroup.push(...group.fields._embedded[item].map(df => this.fieldConvertorService.toClass(df)));
                    });
                }
                dataGroup.forEach(field => {
                    field.valueChanges().subscribe(valueChanged => {
                        const body = {};
                        body[field.stringId] = {type: this.fieldConvertorService.resolveType(field), value: valueChanged};
                        this.taskJsonResourceService.setData('5e7b171d9ceec7242f0e068f', body).subscribe( r => {
                            console.log(r);
                        });
                    });
                });
                this.taskDataGroups.push({
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
