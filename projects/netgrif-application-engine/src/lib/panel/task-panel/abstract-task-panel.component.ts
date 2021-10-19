import {AfterViewInit, EventEmitter, Input, OnDestroy, OnInit, Output, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {Observable, Subscription} from 'rxjs';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {filter, map, take} from 'rxjs/operators';
import {HeaderColumn} from '../../header/models/header-column';
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
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {TaskEventNotification} from '../../task-content/model/task-event-notification';
import {DisableButtonFuntions} from './models/disable-functions';
import {Task} from '../../resources/interface/task';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {PanelWithImmediateData} from '../abstract/panel-with-immediate-data';
import {TranslateService} from '@ngx-translate/core';
import {FeaturedValue} from '../abstract/featured-value';
import {CurrencyPipe} from '@angular/common';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {ChangedFieldsMap} from '../../event/services/event.service';

export abstract class AbstractTaskPanelComponent extends PanelWithImmediateData implements OnInit, AfterViewInit, OnDestroy {

    /**
     * @ignore
     * Set by an @Input() on a setter function, that also resolves featured fields.
     */
    protected _taskPanelData: TaskPanelData;
    protected _forceLoadDataOnOpen = false;
    @Input() panelContentComponent: Type<any>;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() public first: boolean;
    @Input() public last: boolean;
    @Input() responsiveBody = true;

    @Input()
    set forceLoadDataOnOpen(force: boolean) {
        this._forceLoadDataOnOpen = force;
        this._assignPolicyService.forced = force;
    }

    @Input() textEllipsis = false;
    /**
     * Emits notifications about task events
     */
    @Output() taskEvent: EventEmitter<TaskEventNotification>;
    @Output() panelRefOutput: EventEmitter<MatExpansionPanel>;

    public portal: ComponentPortal<any>;
    public panelRef: MatExpansionPanel;
    protected _sub: Subscription;
    protected _subTaskEvent: Subscription;
    protected _subTaskData: Subscription;
    protected _subOperationOpen: Subscription;
    protected _subOperationClose: Subscription;
    protected _subOperationReload: Subscription;
    protected _subOperationForceReload: Subscription;
    protected _subPanelUpdate: Subscription;
    protected _taskDisableButtonFunctions: DisableButtonFuntions;

    protected constructor(protected _taskContentService: TaskContentService,
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
                          protected _taskOperations: SubjectTaskOperations,
                          protected _disableFunctions: DisableButtonFuntions,
                          protected _translate: TranslateService,
                          protected _currencyPipe: CurrencyPipe,
                          protected _changedFieldsService: ChangedFieldsService) {
        super(_translate, _currencyPipe);
        this.taskEvent = new EventEmitter<TaskEventNotification>();
        this.panelRefOutput = new EventEmitter<MatExpansionPanel>();
        this._subTaskEvent = _taskEventService.taskEventNotifications$.subscribe(event => {
            this.taskEvent.emit(event);
        });
        this._subTaskData = _changedFieldsService.changedFields$.subscribe((changedFieldsMap: ChangedFieldsMap) => {
            const filteredCaseIds: Array<string> = Object.keys(changedFieldsMap).filter(
                caseId => Object.keys(this._taskContentService.referencedTaskAndCaseIds).includes(caseId)
            );
            const changedFields: Array<ChangedFields> = [];
            filteredCaseIds.forEach(caseId => {
                const taskIds: Array<string> = this._taskContentService.referencedTaskAndCaseIds[caseId];
                changedFields.push(...this._changedFieldsService.parseChangedFieldsByCaseAndTaskIds(caseId, taskIds, changedFieldsMap));
            });
            changedFields.filter(fields => fields !== undefined).forEach(fields => {
               this.taskPanelData.changedFields.next(fields);
            });
        });
        this._subOperationOpen = _taskOperations.open$.subscribe(() => {
            this.expand();
        });
        this._subOperationClose = _taskOperations.close$.subscribe(() => {
            this.collapse();
        });
        this._subOperationReload = _taskOperations.reload$.subscribe(() => {
            this._taskViewService.reloadCurrentPage();
        });
        this._subOperationForceReload = _taskOperations.forceReload$.subscribe(() => {
            this._taskViewService.reloadCurrentPage(true);
        });
        this._taskDisableButtonFunctions = {
            finish: (t: Task) => false,
            assign: (t: Task) => false,
            delegate: (t: Task) => false,
            reassign: (t: Task) => false,
            cancel: (t: Task) => false,
        };
        if (_disableFunctions) {
            Object.assign(this._taskDisableButtonFunctions, _disableFunctions);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._taskContentService.task = this._taskPanelData.task;

        this.createContentPortal();
        this._sub = this._taskPanelData.changedFields.subscribe(chFields => {
            this._taskContentService.updateFromChangedFields(chFields);
        });

        this._subPanelUpdate = this._taskViewService.panelUpdate.pipe(
            map(a => a.find(p => p.task.stringId === this.taskPanelData.task.stringId)),
            filter(p => !!p)
        ).subscribe(value => {
            this.resolveFeaturedFieldsValues();
        });
    }

    ngAfterViewInit() {
        this.panelRef.opened.subscribe(() => {
            this._taskContentService.expansionStarted();
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
            this._taskContentService.$shouldCreate.pipe(take(1)).subscribe(() => {
                this._taskContentService.blockFields(!this.canFinish());
                this._taskPanelData.initiallyExpanded = true;
            });
            this._taskContentService.expansionFinished();
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
        this.panelRefOutput.emit(panelRef);
    }

    assign() {
        this._assignTaskService.assign(this._callChain.create((afterAction => {
            if (afterAction) {
                this._taskDataService.initializeTaskDataFields();
            }
        })));
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
        if (!this._taskContentService.validateTaskData()) {
            if (this._taskContentService.task.dataSize <= 0) {
                this._taskDataService.initializeTaskDataFields();
            }
            const invalidFields = this._taskContentService.getInvalidTaskData();
            document.getElementById(invalidFields[0].stringId).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        } else {
            this._finishTaskService.validateDataAndFinish();
        }
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
        return this._taskEventService.canAssign() && this.getAssignTitle() !== '';
    }

    public canReassign(): boolean {
        return this._taskEventService.canReassign();
    }

    public canCancel(): boolean {
        return this._taskEventService.canCancel() && this.getCancelTitle() !== '';
    }

    public canFinish(): boolean {
        return this._taskEventService.canFinish() && this.getFinishTitle() !== '';
    }

    public canCollapse(): boolean {
        return this._taskEventService.canCollapse();
    }

    public canDo(action): boolean {
        return this._taskEventService.canDo(action) && this.getDelegateTitle() !== '';
    }

    public getAssignTitle(): string {
        return (this.taskPanelData.task.assignTitle === '' || this.taskPanelData.task.assignTitle)
            ? this.taskPanelData.task.assignTitle : 'tasks.view.assign';
    }

    public getCancelTitle(): string {
        return (this.taskPanelData.task.cancelTitle === '' || this.taskPanelData.task.cancelTitle)
            ? this.taskPanelData.task.cancelTitle : 'tasks.view.cancel';
    }

    public getDelegateTitle(): string {
        return (this.taskPanelData.task.delegateTitle === '' || this.taskPanelData.task.delegateTitle)
            ? this.taskPanelData.task.delegateTitle : 'tasks.view.delegate';
    }

    public getFinishTitle(): string {
        return (this.taskPanelData.task.finishTitle === '' || this.taskPanelData.task.finishTitle)
            ? this.taskPanelData.task.finishTitle : 'tasks.view.finish';
    }

    public canDisable(type: string): boolean {
        let disable = false;
        if (!!this.taskPanelData && !!this.taskPanelData.task) {
            disable = disable
                || !!this._taskState.isLoading(this.taskPanelData.task.stringId)
                || !!this._taskState.isUpdating(this.taskPanelData.task.stringId);
        }
        return disable || this._taskDisableButtonFunctions[type]({...this._taskContentService.task});
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): FeaturedValue {
        const task = this._taskPanelData.task;
        switch (selectedHeader.fieldIdentifier) {
            case TaskMetaField.CASE:
                return {value: task.caseTitle, icon: '', type: 'meta'};
            case TaskMetaField.CASE_ID:
                return {value: task.caseId, icon: '', type: 'meta'};
            case TaskMetaField.TASK_ID:
                return {value: task.stringId, icon: '', type: 'meta'};
            case TaskMetaField.TITLE:
                return {value: task.title, icon: '', type: 'meta'};
            case TaskMetaField.PRIORITY:
                // TODO priority
                if (!task.priority || task.priority < 2) {
                    return {value: 'high', icon: 'error', type: 'meta'};
                }
                if (task.priority === 2) {
                    return {value: 'medium', icon: 'north', type: 'meta'};
                }
                return {value: 'low', icon: 'south', type: 'meta'};
            case TaskMetaField.USER:
                return {value: task.user ? task.user.fullName : '', icon: 'account_circle', type: 'meta'};
            case TaskMetaField.ASSIGN_DATE:
                return {
                    value: task.startDate ? toMoment(task.startDate).format(DATE_TIME_FORMAT_STRING) : '',
                    icon: 'event',
                    type: 'meta'
                };
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): FeaturedValue {
        if (this._taskContentService.task && this._taskContentService.task.immediateData) {
            const immediate = this._taskContentService.task.immediateData.find(it => it.stringId === selectedHeader.fieldIdentifier);
            return this.parseImmediateValue(immediate);
        }
        return {value: '', icon: '', type: ''};
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._sub.unsubscribe();
        this._subTaskEvent.unsubscribe();
        this._subTaskData.unsubscribe();
        this._subOperationOpen.unsubscribe();
        this._subOperationClose.unsubscribe();
        this._subOperationReload.unsubscribe();
        this._subOperationForceReload.unsubscribe();
        this._subPanelUpdate.unsubscribe();
        this.taskEvent.complete();
    }
}
