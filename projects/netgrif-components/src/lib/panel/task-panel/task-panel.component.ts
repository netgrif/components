import {Component, Inject, Injector, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {
    TaskContentService,
    LoggerService,
    TaskViewService,
    PaperViewService,
    TaskEventService,
    AssignTaskService,
    DelegateTaskService,
    CancelTaskService,
    FinishTaskService,
    TaskRequestStateService,
    DataFocusPolicyService,
    TaskDataService,
    AssignPolicyService,
    FinishPolicyService,
    NAE_TASK_OPERATIONS,
    SubjectTaskOperations,
    SingleTaskContentService,
    AbstractTaskPanelComponent
} from '@netgrif/application-engine';
import {TaskContentComponent} from '../../task-content/task-content/task-content.component';

@Component({
    selector: 'nc-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    providers: [
        {provide: TaskContentService, useClass: SingleTaskContentService},
        TaskDataService,
        TaskEventService,
        AssignTaskService,
        DelegateTaskService,
        CancelTaskService,
        FinishTaskService,
        TaskRequestStateService,
        DataFocusPolicyService,
        AssignPolicyService,
        FinishPolicyService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
    ]
})
export class TaskPanelComponent extends AbstractTaskPanelComponent {

    constructor(protected _taskContentService: TaskContentService,
                protected _log: LoggerService,
                protected _taskViewService: TaskViewService,
                protected _paperView: PaperViewService,
                protected _taskEventService: TaskEventService,
                protected _assignTaskService: AssignTaskService,
                protected _delegateTaskService: DelegateTaskService,
                protected _cancelTaskService: CancelTaskService,
                protected _finishTaskService: FinishTaskService,
                protected _taskState: TaskRequestStateService,
                protected _taskDataService: TaskDataService,
                protected _assignPolicyService: AssignPolicyService,
                @Inject(NAE_TASK_OPERATIONS) _taskOperations: SubjectTaskOperations) {
        super(_taskContentService, _log, _taskViewService, _paperView, _taskEventService, _assignTaskService,
            _delegateTaskService, _cancelTaskService, _finishTaskService, _taskState, _taskDataService,
            _assignPolicyService, _taskOperations);
    }

    protected createContentPortal(): void {
        const providers: StaticProvider[] = [
            {provide: TaskContentService, useValue: this._taskContentService}
        ];
        const injector = Injector.create({providers});

        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskContentComponent, null, injector);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent, null, injector);
        }
    }
}
