import {Subject} from 'rxjs';
import {OnInit} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {TaskResourceService} from './task-resource/task-resource.service';
import {TaskPanelDefinition} from '../panel/task-panel/task-panel-definition';
import {ChangedFields} from '../data-fields/models/changed-fields';

export abstract class AbstractTaskView implements OnInit {

    public taskPanel: Array<TaskPanelData> = [];
    public changedFields: Subject<ChangedFields>;

    protected constructor(protected _taskService: TaskResourceService) {
        this.changedFields = new Subject<ChangedFields>();
    }

    ngOnInit() {
        this._taskService.searchTask({}).subscribe(tasks => {   // TODO: filter
            tasks.forEach(task => {
                const header: TaskPanelDefinition = {
                    panelIconField: task.caseTitle,
                    panelIcon: 'home',
                    featuredFields: [
                        task.title,
                        0,
                        typeof task.user !== 'undefined' ? task.user.fullName : '',
                        task.startDate],
                    taskId: task.stringId
                };
                console.log(header);
                this.taskPanel.push({
                    header,
                    task,
                    changedFields: this.changedFields
                });
            });
            console.log(this.taskPanel);
        });
    }
}
