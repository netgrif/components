import {Subject} from 'rxjs';
import {OnInit} from '@angular/core';
import {TaskPanelData} from '../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskResourceService} from '../panel/task-panel-list/task-resource/task-resource.service';
import {TaskPanelDefinition} from '../panel/task-panel/task-panel-definition';
import {ChangedFields} from '../data-fields/models/changed-fields';
import {TaskViewService} from './task-view.service';

export abstract class AbstractTaskView implements OnInit {

    public taskPanel: Array<TaskPanelData> = [];
    public changedFields: Subject<ChangedFields>;
    public loading: boolean;

    protected constructor(private taskViewService: TaskViewService) {
        this.taskPanel = [];
        this.taskViewService.taskData.subscribe( data => {
            this.taskPanel = data;
        });
        this.changedFields = new Subject<ChangedFields>();
        this.taskViewService.changedFields.subscribe( chFields => {
            this.changedFields.next(chFields);
        });
        this.loading = false;
        this.taskViewService.loading.subscribe( load => {
            this.loading = load;
        });
    }

    ngOnInit() {
        this.taskViewService.loadTasks();
    }
}
