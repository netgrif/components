import {Component, OnInit} from '@angular/core';
import {TaskPanelData} from '@netgrif/application-engine';
import {TaskJsonResourceService} from '../../task-json-resource.service';
import {DataField} from '../../../../../netgrif-application-engine/src/lib/data-fields/models/abstract-data-field';
import {TaskPanelDefinition} from '../../../../../../dist/netgrif-application-engine/lib/panel/task-panel/task-panel-definition';
import {DataGroup} from '../../../../../netgrif-application-engine/src/lib/resources/interface/data-groups';


@Component({
    selector: 'nae-app-tasks-task-view',
    templateUrl: './tasks-task-view.component.html',
    styleUrls: ['./tasks-task-view.component.scss']
})
export class TasksTaskViewComponent implements OnInit {

    public taskPanel: Array<TaskPanelData> = [];


    constructor(private _taskService: TaskJsonResourceService) {
    }

    ngOnInit() {
        this._taskService.searchTask({}).subscribe(tasks => {   // TODO: filter
            tasks.forEach(task => {
                const _header: TaskPanelDefinition = {
                    panelIconField: 'home',
                    panelIcon: 'home',
                    featuredFields: [
                        task.caseTitle,
                        task.title,
                        0,
                        typeof task.user !== 'undefined' ? task.user.fullName : ''],
                    taskId: task.stringId
                };
                console.log(_header);
                this.taskPanel.push({
                    header: _header
                });
            });
            console.log(this.taskPanel);
        });
        // this.taskPanel = [{
        //     header: {
        //         featuredFields: ['T1', 'T2', 'T3', 'T4'],
        //         panelIcon: 'home',
        //         panelIconField: 'home',
        //     },
        //     // resource: {
        //     //     fields: this.data,
        //     //     title: 'aaa',
        //     //     alignment: 'start',
        //     //     stretch: false,
        //     // }
        // },{
        //     header: {
        //         featuredFields: ['T1', 'T2', 'T3', 'T4'],
        //         panelIcon: 'home',
        //         panelIconField: 'home',
        //     },
        //     // resource: {
        //     //     cols: 4,
        //     //     data: ''
        //     // }
        // },
        //     {
        //         header: {
        //             featuredFields: ['T1', 'T2', 'T3', 'T4'],
        //             panelIcon: 'home',
        //             panelIconField: 'home',
        //         },
        //         // resource: {
        //         //     cols: 4,
        //         //     data: ''
        //         // }
        //     }];
    }
}
