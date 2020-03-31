import {Injectable} from '@angular/core';
import {TaskPanelDefinition} from '../../panel/task-panel/task-panel-definition';
import {Subject} from 'rxjs';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';

@Injectable()
export class TaskViewService {
    taskArray: Array<TaskPanelData>;
    taskData: Subject<Array<TaskPanelData>>;
    changedFields: Subject<ChangedFields>;
    loading: Subject<boolean>;
    private _activeFilter: string;

    constructor(protected _taskService: TaskResourceService) {
        this.taskArray = [];
        this.taskData = new Subject<Array<TaskPanelData>>();
        this.loading = new Subject<boolean>();
        this.changedFields = new Subject<ChangedFields>();
        this._activeFilter = '{}';
    }

    public set activeFilter(newFilter: string) {
        this._activeFilter = newFilter;
    }

    loadTasks() {
        this.taskArray = [];
        this.loading.next(true);
        this._taskService.searchTask(JSON.parse(this._activeFilter)).subscribe(tasks => {
            if (tasks instanceof Array) {
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
                    this.taskArray.push({
                        header,
                        task,
                        changedFields: this.changedFields
                    });
                });
            }
            this.loading.next(false);
            this.taskData.next(this.taskArray);
        });
    }
}
