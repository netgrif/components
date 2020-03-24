import {Component, OnInit} from '@angular/core';
import {Count, DataGroups, MessageResource, Task} from 'netgrif-application-engine';
import {TaskJsonResourceService} from '../../task-json-resource.service';

@Component({
    selector: 'nae-app-task-resource-example',
    templateUrl: './task-resource-example.component.html',
    styleUrls: ['./task-resource-example.component.scss']
})
export class TaskResourceExampleComponent implements OnInit {

    constructor(private taskJsonResourceService: TaskJsonResourceService) {
    }

    countvalue: Count = undefined;
    getAllTaskData: Array<Task> = undefined;
    getTaskData: MessageResource = undefined;
    deletetaskData: MessageResource = undefined;
    taskData: Array<DataGroups> = undefined;


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
        this.taskJsonResourceService.assignTask('5e78949e750960460db342b8').subscribe(task => {
            console.log(task);
            this.getTaskData = task;
        });
    }

    cancelTask() {
        this.taskJsonResourceService.cancelTask('5e78949e750960460db342b8').subscribe(task => {
            console.log(task);
            this.deletetaskData = task;
        });
    }

    getDataTask() {
        this.taskJsonResourceService.getData('5e78949e750960460db342b8').subscribe(task => {
            console.log(task);
            this.taskData = task;
        });
    }


}
