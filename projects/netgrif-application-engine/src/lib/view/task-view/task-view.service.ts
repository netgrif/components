import {Injectable} from '@angular/core';
import {TaskPanelDefinition} from '../../panel/task-panel/task-panel-definition';
import {BehaviorSubject, Subject} from 'rxjs';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../user/services/user.service';

@Injectable()
export class TaskViewService {
    taskArray: Array<TaskPanelData>;
    taskData: Subject<Array<TaskPanelData>>;
    changedFields: Subject<ChangedFields>;
    loading: BehaviorSubject<boolean>;
    private _activeFilter: string;

    constructor(protected _taskService: TaskResourceService, private _userService: UserService) {
        this.taskArray = [];
        this.taskData = new Subject<Array<TaskPanelData>>();
        this.loading = new BehaviorSubject<boolean>(false);
        this.changedFields = new Subject<ChangedFields>();
        this._activeFilter = '{}';
    }

    public set activeFilter(newFilter: string) {
        this._activeFilter = newFilter;
    }

    loadTasks() {
        if (this.loading.getValue()) {
            return;
        }
        this.loading.next(true);
        this._taskService.searchTask(JSON.parse(this._activeFilter)).subscribe(tasks => {
            if (tasks instanceof Array) {
                if (this.taskArray.length) {
                    tasks = this.resolveUpdate(tasks);
                }
                tasks.forEach(task => {
                    const header: TaskPanelDefinition = {
                        panelIconField: task.caseTitle,
                        panelIcon: task.icon === undefined ? 'label' : task.icon,
                        featuredFields: [
                            task.title,
                            0,
                            task.user !== undefined ? task.user.fullName : '',
                            task.startDate !== undefined ? this.parseDate(task.startDate) : ''],
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

    resolveUpdate(tasks) {
        const tasksToDelete = []; // saved are only indexes for work later
        this.taskArray.forEach((item, i) => {
            const index = tasks.findIndex(r => r.caseId === item.task.caseId && r.transitionId === item.task.transitionId);
            if (index === -1)
                tasksToDelete.push(i);
            else {
                const header: TaskPanelDefinition = {
                    panelIconField: tasks[index].caseTitle,
                    panelIcon: 'home',
                    featuredFields: [
                        tasks[index].title,
                        0,
                        tasks[index].user !== undefined ? tasks[index].user.fullName : '',
                        tasks[index].startDate !== undefined ? this.parseDate(tasks[index].startDate) : ''
                    ],
                    taskId: tasks[index].stringId
                };
                this.taskArray[i].header = header;
                Object.keys(this.taskArray[i].task).forEach( key => {
                    if (tasks[index][key] !== undefined) {
                        this.taskArray[i].task[key] = tasks[index][key];
                    }
                });
                this.blockFields(!(this.taskArray[i].task.user && this.taskArray[i].task.user.email === this._userService.user.email), i);
                this.taskArray[i].changedFields = this.changedFields;
                tasks.splice(index, 1);
            }
        });
        tasksToDelete.sort((a, b) => b - a);
        tasksToDelete.forEach(index => tasks.splice(index, 1));
        return tasks;
    }

    private parseDate(date: Array<number>) {
        return new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
    }

    private blockFields(bool: boolean, index: number) {
        if (this.taskArray[index].task.dataGroups) {
            this.taskArray[index].task.dataGroups.forEach( group => {
                group.fields.forEach(field => {
                    field.block = bool;
                });
            });
        }
    }
}
