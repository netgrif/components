import {Component} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {FinishTaskService} from '../../../task/services/finish-task.service';
import {TaskRequestStateService} from '../../../task/services/task-request-state.service';
import {DataFocusPolicyService} from '../../../task/services/data-focus-policy.service';
import {NAE_TASK_OPERATIONS} from '../../../task/models/task-operations-injection-token';
import {NullTaskOperations} from '../../../task/models/null-task-operations';
import {NAE_TASK_COLS} from '../../../task-content/task-content/task-content.component';
import {UnlimitedTaskContentService} from '../../../task-content/services/unlimited-task-content.service';
import {TreeTaskContentService} from './tree-task-content.service';

@Component({
    selector: 'nae-tree-task-content',
    templateUrl: './tree-task-content.component.html',
    styleUrls: ['./tree-task-content.component.scss'],
    providers: [
        {provide: TaskContentService, useClass: UnlimitedTaskContentService},
        TreeTaskContentService,
        AssignTaskService,
        TaskDataService,
        TaskEventService,
        CancelTaskService,
        FinishTaskService,
        TaskRequestStateService,
        DataFocusPolicyService,
        {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
        {provide: NAE_TASK_COLS, useValue: undefined}
    ]
})
export class TreeTaskContentComponent {

    public show = false;
    public loading = false;

    constructor(private _treeTaskContentService: TreeTaskContentService,
                private _taskEventService: TaskEventService,
                private _cancel: CancelTaskService,
                private _finish: FinishTaskService) {
    }

    public canCancel(): boolean {
        return this._taskEventService.canCancel();
    }

    public canFinish(): boolean {
        return this._taskEventService.canFinish();
    }

    public cancel(): void {
        this._cancel.cancel();
    }

    public finish(): void {
        this._finish.validateDataAndFinish();
    }
}
