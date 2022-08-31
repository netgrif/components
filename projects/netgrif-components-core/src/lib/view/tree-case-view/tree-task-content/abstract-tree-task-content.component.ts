import {AfterViewInit, Component, Input} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {FinishTaskService} from '../../../task/services/finish-task.service';
import {TreeTaskContentService} from './tree-task-content.service';
import {Observable} from 'rxjs';
import {PermissionService} from '../../../authorization/permission/permission.service';

@Component({
    selector: 'ncc-abstract-tree-task-content',
    template: ''
})
export abstract class AbstractTreeTaskContentComponent implements AfterViewInit {

    @Input() public displayTaskControlButtons = true;

    constructor(protected _treeTaskContentService: TreeTaskContentService,
                protected _taskEventService: TaskEventService,
                protected _assign: AssignTaskService,
                protected _cancel: CancelTaskService,
                protected _finish: FinishTaskService,
                protected _taskContentService: TaskContentService,
                protected _permissionService: PermissionService) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._treeTaskContentService.displayEmptyTaskContent();
        });
    }

    public canAssign(): boolean {
        return this._permissionService.canAssign(this._taskContentService.task);
    }

    public canCancel(): boolean {
        return this._permissionService.canCancel(this._taskContentService.task);
    }

    public canFinish(): boolean {
        return this._permissionService.canFinish(this._taskContentService.task);
    }

    public assign(): void {
        this._assign.assign();
    }

    public cancel(): void {
        this._cancel.cancel();
    }

    public finish(): void {
        this._finish.validateDataAndFinish();
    }

    public getAssignTitle(): string {
        return this._taskContentService.task.assignTitle ? this._taskContentService.task.assignTitle : 'tasks.view.assign';
    }

    public getCancelTitle(): string {
        return this._taskContentService.task.cancelTitle ? this._taskContentService.task.cancelTitle : 'tasks.view.cancel';
    }

    public getFinishTitle(): string {
        return this._taskContentService.task.finishTitle ? this._taskContentService.task.finishTitle : 'tasks.view.finish';
    }

    public get processingTaskChange(): boolean {
        return this._treeTaskContentService.processingTaskChange;
    }

    public get taskContentText$(): Observable<string> {
        return this._treeTaskContentService.taskContentText$;
    }
}
