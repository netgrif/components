import {AfterViewInit, Input, OnInit, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {Observable, Subject} from 'rxjs';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {filter, map} from 'rxjs/operators';
import {HeaderColumn} from '../../header/models/header-column';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AssignTaskService} from '../../task/services/assign-task.service';
import {DelegateTaskService} from '../../task/services/delegate-task.service';
import {CancelTaskService} from '../../task/services/cancel-task.service';
import {FinishTaskService} from '../../task/services/finish-task.service';
import {TaskMetaField} from '../../header/task-header/task-meta-enum';
import {TaskRequestStateService} from '../../task/services/task-request-state.service';
import {TaskDataService} from '../../task/services/task-data.service';
import {AssignPolicyService} from '../../task/services/assign-policy.service';
import {SubjectTaskOperations} from '../../task/models/subject-task-operations';
import {SingleTaskContentService} from '../../task-content/services/single-task-content.service';
import {CallChainService} from '../../utility/call-chain/call-chain.service';

export abstract class AbstractTaskPanelComponent extends PanelWithHeaderBinding implements OnInit, AfterViewInit {

    /**
     * @ignore
     * Set by an @Input() on a setter function, that also resolves featured fields.
     */
    protected _taskPanelData: TaskPanelData;
    @Input() panelContentComponent: Type<any>;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() public first: boolean;
    @Input() public last: boolean;
    @Input() responsiveBody = true;

    public portal: ComponentPortal<any>;
    public panelRef: MatExpansionPanel;

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
                _taskOperations: SubjectTaskOperations) {
        super();
        _taskDataService.changedFields$.subscribe(changedFields => {
            this._taskPanelData.changedFields.next(changedFields);
            if (this._taskContentService.task) {
                Object.keys(changedFields).forEach(value => {
                    if (changedFields[value].type === 'taskRef') {
                        this._taskDataService.initializeTaskDataFields(new Subject<boolean>(), true);
                    }
                });
            }
        });
        _taskOperations.open$.subscribe(() => {
            this.expand();
        });
        _taskOperations.close$.subscribe(() => {
            this.collapse();
        });
        _taskOperations.reload$.subscribe(() => {
            this._taskViewService.reloadCurrentPage();
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this._taskContentService.task = this._taskPanelData.task;

        // this._taskViewService.tasks$.subscribe(() => this.resolveFeaturedFieldsValues()); // TODO spraviť to inak ako subscribe
        this.createContentPortal();

        this._taskPanelData.changedFields.subscribe(chFields => {
            this._taskContentService.updateFromChangedFields(chFields);
        });

        this._taskViewService.panelUpdate.pipe(
            map(a => a.find(p => p.task.stringId === this.taskPanelData.task.stringId)),
            filter(p => !!p)
        ).subscribe(value => {
            this.resolveFeaturedFieldsValues();
        });
    }

    ngAfterViewInit() {
        this.panelRef.opened.subscribe(() => {
            if (!this._taskState.isLoading()) {
                this._assignPolicyService.performAssignPolicy(true);
            }
        });
        this.panelRef.closed.subscribe(() => {
            if (!this._taskState.isLoading()) {
                this._assignPolicyService.performAssignPolicy(false);
            }
        });
        this.panelRef.afterExpand.subscribe(() => {
            this._taskContentService.blockFields(!this.canFinish());
            this._taskPanelData.initiallyExpanded = true;
        });
        this.panelRef.afterCollapse.subscribe(() => {
            this._taskPanelData.initiallyExpanded = false;
        });

        if (this._taskPanelData.initiallyExpanded) {
            this.panelRef.expanded = true;
        }
    }

    protected abstract createContentPortal(): void;

    @Input()
    public set taskPanelData(data: TaskPanelData) {
        this._taskPanelData = data;
        this.resolveFeaturedFieldsValues();
    }

    public get taskPanelData(): TaskPanelData {
        return this._taskPanelData;
    }

    public get isLoading(): boolean {
        return this._taskState.isLoading();
    }

    public stopLoading(): void {
        this._taskState.stopLoading(this._taskPanelData.task.stringId);
    }

    public preventPanelOpen($event: MouseEvent): boolean {
        $event.stopPropagation();
        return false;
    }

    public isPaperView() {
        return this._paperView.paperView;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

    assign() {
        this._assignTaskService.assign();
    }

    delegate() {
        this._delegateTaskService.delegate();
    }

    cancel() {
        this._cancelTaskService.cancel(this._callChain.create(() => {
            this._taskOperations.reload();
            this._taskOperations.close();
        }));
    }

    finish() {
        this._finishTaskService.validateDataAndFinish();
    }

    collapse() {
        this.panelRef.close();
        this.panelRef.expanded = false;
    }

    expand() {
        this.panelRef.open();
        this.panelRef.expanded = true;
    }

    public canAssign(): boolean {
        return this._taskEventService.canAssign();
    }

    public canReassign(): boolean {
        return this._taskEventService.canReassign();
    }

    public canCancel(): boolean {
        return this._taskEventService.canCancel();
    }

    public canFinish(): boolean {
        return this._taskEventService.canFinish();
    }

    public canCollapse(): boolean {
        return this._taskEventService.canCollapse();
    }

    public canDo(action): boolean {
        return this._taskEventService.canDo(action);
    }

    public getAssignTitle(): string {
        return this.taskPanelData.task.assignTitle ? this.taskPanelData.task.assignTitle : 'tasks.view.assign';
    }

    public getCancelTitle(): string {
        return this.taskPanelData.task.cancelTitle ? this.taskPanelData.task.cancelTitle : 'tasks.view.cancel';
    }

    public getDelegateTitle(): string {
        return this.taskPanelData.task.delegateTitle ? this.taskPanelData.task.delegateTitle : 'tasks.view.delegate';
    }

    public getFinishTitle(): string {
        return this.taskPanelData.task.finishTitle ? this.taskPanelData.task.finishTitle : 'tasks.view.finish';
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn) {
        const task = this._taskPanelData.task;
        switch (selectedHeader.fieldIdentifier) {
            case TaskMetaField.CASE:
                return {value: task.caseTitle, icon: ''};
            case TaskMetaField.TITLE:
                return {value: task.title, icon: ''};
            case TaskMetaField.PRIORITY:
                // TODO priority
                if (!task.priority || task.priority < 2) {
                    return {value: 'high', icon: 'error'};
                }
                if (task.priority === 2) {
                    return {value: 'medium', icon: 'north'};
                }
                return {value: 'low', icon: 'south'};
            case TaskMetaField.USER:
                return {value: task.user ? task.user.fullName : '', icon: 'account_circle'};
            case TaskMetaField.ASSIGN_DATE:
                return {
                    value: task.startDate ? toMoment(task.startDate).format(DATE_TIME_FORMAT_STRING) : '',
                    icon: 'event'
                };
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn) {
        this._log.warn('Immediate data in task panel headers are currently not supported');
        return {value: '', icon: ''};
    }

}
