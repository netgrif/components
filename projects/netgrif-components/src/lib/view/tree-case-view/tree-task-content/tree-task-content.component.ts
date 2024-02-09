import {Component} from '@angular/core';
import {
    AbstractTreeTaskContentComponent,
    AssignPolicyService,
    AssignTaskService,
    CancelTaskService,
    DataFocusPolicyService,
    FinishPolicyService,
    FinishTaskService,
    NAE_TASK_OPERATIONS,
    SelectedCaseService,
    SubjectTaskOperations,
    TaskContentService,
    TaskDataService,
    TaskEventService,
    TaskRequestStateService,
    TreeTaskContentService,
    UnlimitedTaskContentService,
    PermissionService,
    FrontActionService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-tree-task-content',
    templateUrl: './tree-task-content.component.html',
    styleUrls: ['./tree-task-content.component.scss'],
    providers: [
        FrontActionService,
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
        SelectedCaseService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
    ]
})
export class TreeTaskContentComponent extends AbstractTreeTaskContentComponent {

    constructor(protected _treeTaskContentService: TreeTaskContentService,
                protected _taskEventService: TaskEventService,
                protected _assign: AssignTaskService,
                protected _cancel: CancelTaskService,
                protected _finish: FinishTaskService,
                protected _taskContentService: TaskContentService,
                protected _permissionService: PermissionService) {
        super(_treeTaskContentService, _taskEventService, _assign, _cancel, _finish, _taskContentService, _permissionService);
    }
}
