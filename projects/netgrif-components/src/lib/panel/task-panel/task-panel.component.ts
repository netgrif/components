import {Component, Inject, Injector, Optional, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {
    AbstractTaskPanelComponent,
    AssignPolicyService,
    AssignTaskService,
    CallChainService,
    CancelTaskService,
    DataFocusPolicyService,
    DelegateTaskService,
    DisableButtonFuntions,
    FinishPolicyService,
    FinishTaskService,
    LoggerService,
    NAE_TASK_OPERATIONS,
    NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
    BOOLEAN_VALUE_LABEL_ENABLED,
    PaperViewService,
    SingleTaskContentService,
    SubjectTaskOperations,
    TaskContentService,
    TaskDataService,
    TaskEventService,
    TaskRequestStateService,
    TaskViewService,
    PermissionService
} from '@netgrif/application-engine';
import {TaskContentComponent} from '../../task-content/task-content/task-content.component';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe} from '@angular/common';

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
                protected _callChain: CallChainService,
                protected _translate: TranslateService,
                @Inject(NAE_TASK_OPERATIONS) _taskOperations: SubjectTaskOperations,
                @Optional() @Inject(NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS) protected _disableFunctions: DisableButtonFuntions,
                @Optional() @Inject(BOOLEAN_VALUE_LABEL_ENABLED) protected isEnabled: boolean,
                protected _parentInjector: Injector,
                protected _currencyPipe: CurrencyPipe,
                protected _permissionService: PermissionService) {
        super(_taskContentService, _log, _taskViewService, _paperView, _taskEventService, _assignTaskService,
            _delegateTaskService, _cancelTaskService, _finishTaskService, _taskState, _taskDataService,
            _assignPolicyService, _callChain, _taskOperations, _disableFunctions, _translate, _currencyPipe, _permissionService);
    }

    protected createContentPortal(): void {
        const providers: Array<StaticProvider> = [
            {provide: TaskContentService, useValue: this._taskContentService},
            {provide: BOOLEAN_VALUE_LABEL_ENABLED, useValue: this.isEnabled}
        ];
        const injector = Injector.create({providers, parent: this._parentInjector});

        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskContentComponent, null, injector);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent, null, injector);
        }
    }
}
