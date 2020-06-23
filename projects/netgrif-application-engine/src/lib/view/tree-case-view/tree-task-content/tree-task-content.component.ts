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
import {NAE_TASK_COLS} from '../../../task-content/task-content/task-content.component';
import {UnlimitedTaskContentService} from '../../../task-content/services/unlimited-task-content.service';
import {TreeTaskContentService} from './tree-task-content.service';
import {SubjectTaskOperations} from '../../../task/models/subject-task-operations';
import {AssignPolicyService} from '../../../task/services/assign-policy.service';
import {FinishPolicyService} from '../../../task/services/finish-policy.service';

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
        AssignPolicyService,
        FinishPolicyService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
        {provide: NAE_TASK_COLS, useValue: undefined}
    ]
})
export class TreeTaskContentComponent {

    constructor(private _treeTaskContentService: TreeTaskContentService,
                private _taskEventService: TaskEventService,
                private _assign: AssignTaskService,
                private _cancel: CancelTaskService,
                private _finish: FinishTaskService) {
    }

    public canAssign(): boolean {
        return this._taskEventService.canAssign();
    }

    public canCancel(): boolean {
        return this._taskEventService.canCancel();
    }

    public canFinish(): boolean {
        return this._taskEventService.canFinish();
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
}
