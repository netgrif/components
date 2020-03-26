import {Subject} from 'rxjs';
import {OnInit} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {TaskResourceService} from './abstract-task-service/abstract-task.service';
import {TaskPanelDefinition} from '../panel/task-panel/task-panel-definition';
import {ChangedFields} from '../data-fields/models/changed-fields';

export abstract class AbstractTaskView implements OnInit {

    public taskPanel: Array<TaskPanelData> = [];

    protected constructor(protected _taskService: TaskResourceService) {
    }

    ngOnInit() {
        this._taskService.searchTask({}).subscribe(tasks => {   // TODO: filter
            tasks.forEach(task => {
                const header: TaskPanelDefinition = {
                    panelIconField: 'home',
                    panelIcon: 'home',
                    featuredFields: [
                        task.caseTitle,
                        task.title,
                        0,
                        typeof task.user !== 'undefined' ? task.user.fullName : ''],
                    taskId: task.stringId
                };
                const changedFields = new Subject<ChangedFields>();
                console.log(header);
                this.taskPanel.push({
                    header,
                    task,
                    changedFields
                });
            });
            console.log(this.taskPanel);
        });
    }
}
