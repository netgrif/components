import {AfterViewInit, Component, Injector, Input, OnInit, StaticProvider, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {NAE_TASK_COLS, TaskContentComponent} from '../../task-content/task-panel-content/task-content.component';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {FieldConverterService} from '../../task-content/services/field-converter.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {AssignPolicy, FinishPolicy} from '../../task-content/model/policy';
import {Observable, Subject} from 'rxjs';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {filter, map} from 'rxjs/operators';
import {HeaderColumn} from '../../header/models/header-column';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AssignTaskService} from '../../task/services/assign-task.service';
import {DelegateTaskService} from '../../task/services/delegate-task.service';
import {CancelTaskService} from '../../task/services/cancel-task.service';
import {FinishTaskService} from '../../task/services/finish-task.service';
import {TaskMetaField} from '../../header/task-header/task-meta-enum';
import {TaskRequestStateService} from '../../task/services/task-request-state.service';
import {DataFocusPolicyService} from '../../task/services/data-focus-policy.service';
import {TaskDataService} from '../../task/services/task-data.service';


@Component({
    selector: 'nae-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    providers: [
        TaskContentService,
        TaskDataService,
        TaskEventService,
        AssignTaskService,
        DelegateTaskService,
        CancelTaskService,
        FinishTaskService,
        TaskRequestStateService,
        DataFocusPolicyService
    ]
})
export class TaskPanelComponent extends PanelWithHeaderBinding implements OnInit, AfterViewInit {

    /**
     * @ignore
     * Set by an @Input() on a setter function, that also resolves featured fields.
     */
    private _taskPanelData: TaskPanelData;
    @Input() panelContentComponent: Type<any>;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() public first: boolean;
    @Input() public last: boolean;

    public portal: ComponentPortal<any>;
    public panelRef: MatExpansionPanel;

    constructor(private _taskContentService: TaskContentService,
                private _fieldConverterService: FieldConverterService,
                private _log: LoggerService,
                private _snackBar: SnackBarService,
                private _taskService: TaskResourceService,
                private _taskViewService: TaskViewService,
                private _translate: TranslateService,
                private _paperView: PaperViewService,
                private _taskEventService: TaskEventService,
                private _assignTaskService: AssignTaskService,
                private _delegateTaskService: DelegateTaskService,
                private _cancelTaskService: CancelTaskService,
                private _finishTaskService: FinishTaskService,
                private _taskState: TaskRequestStateService,
                private _taskDataService: TaskDataService,
                private _dataFocusPolicyService: DataFocusPolicyService) {
        super();
        _taskDataService.changedFields$.subscribe( changedFields => {
            this._taskPanelData.changedFields.next(changedFields);
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
            if (!this._taskState.isLoading) {
                this.buildAssignPolicy(true);
            }
        });
        this.panelRef.closed.subscribe(() => {
            if (!this._taskState.isLoading) {
                this.buildAssignPolicy(false);
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

    private createContentPortal(): void {
        let cols: number;
        if (this._taskPanelData.task && this._taskPanelData.task.layout && this._taskPanelData.task.layout.cols) {
            cols = this._taskPanelData.task.layout.cols;
        }

        const providers: StaticProvider[] = [
            {provide: NAE_TASK_COLS, useValue: cols},
            {provide: TaskContentService, useValue: this._taskContentService}
        ];
        const injector = Injector.create({providers});

        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskContentComponent, null, injector);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent, null, injector);
        }
    }

    @Input()
    public set taskPanelData(data: TaskPanelData) {
        this._taskPanelData = data;
        this.resolveFeaturedFieldsValues();
    }

    public get taskPanelData(): TaskPanelData {
        return this._taskPanelData;
    }

    public get isLoading(): boolean {
        return this._taskState.isLoading;
    }

    public stopLoading(): void {
        this._taskState.stopLoading();
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

    processTask(type: string) {
        const after = new Subject<boolean>();
        after.subscribe(bool => {
            if (bool) {
                this._taskViewService.reloadCurrentPage();
            }
            after.complete();
        });
        switch (type) {
            case 'assign':
                this.assign(after);
                break;
            case 'delegate':
                this.delegate(after);
                break;
            case 'cancel':
                this.cancel(after);
                break;
            case 'finish':
                this.finish(after);
                break;
        }
    }

    assign(afterAction = new Subject<boolean>()) {
        this._assignTaskService.assign(afterAction);
    }

    delegate(afterAction = new Subject<boolean>()) {
        this._delegateTaskService.delegate(afterAction);
    }

    cancel(afterAction = new Subject<boolean>()) {
        this._cancelTaskService.cancel(afterAction);
    }

    finish(afterAction = new Subject<boolean>()) {
        const collapseAfter = new Subject<boolean>();
        collapseAfter.subscribe( result => {
            afterAction.next(result);
            if (result) {
                this.collapse();
            }
            collapseAfter.complete();
        });
        this._finishTaskService.validateDataAndFinish(collapseAfter);
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

    private buildAssignPolicy(success: boolean): void {
        if (this._taskPanelData.task.assignPolicy === AssignPolicy.auto) {
            this.autoAssignPolicy(success);
        } else {
            this.manualAssignPolicy(success);
        }
    }

    private autoAssignPolicy(success: boolean): void {
        const after = new Subject<boolean>();
        if (success) {
            after.subscribe(bool => {
                this._taskViewService.reloadCurrentPage();
                if (bool) {
                    const afterLoad = new Subject<boolean>();
                    afterLoad.subscribe(boolean => {
                        if (boolean) {
                            this.buildFinishPolicy(true);
                        }
                        afterLoad.complete();
                    });
                    this._taskDataService.initializeTaskDataFields(afterLoad);
                }
                after.complete();
            });
            this.assign(after);
        } else {
            after.subscribe(bool => {
                this._taskViewService.reloadCurrentPage();
                this.collapse();
                after.complete();
            });
            this.cancel(after);
        }
    }

    private manualAssignPolicy(success: boolean): void {
        if (success) {
            const afterLoad = new Subject<boolean>();
            afterLoad.subscribe(boolean => {
                if (boolean) {
                    this.buildFinishPolicy(true);
                }
                afterLoad.complete();
            });
            this._taskDataService.initializeTaskDataFields(afterLoad);
        }
    }

    private buildFinishPolicy(success: boolean): void {
        if (this._taskPanelData.task.finishPolicy === FinishPolicy.autoNoData) {
            this.autoNoDataFinishPolicy(success);
        } else {
            this.manualFinishPolicy(success);
        }
    }

    private autoNoDataFinishPolicy(success: boolean): void {
        if (success) {
            if (this._taskPanelData.task.dataSize <= 0) {
                this.processTask('finish');
                this.collapse();
            } else {
                this.expand();
                this._dataFocusPolicyService.buildDataFocusPolicy(true);
            }
        }
    }

    private manualFinishPolicy(success: boolean): void {
        if (success) {
            this.expand();
            this._dataFocusPolicyService.buildDataFocusPolicy(true);
        } else {
            this._taskDataService.initializeTaskDataFields();
        }
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): string {
        const task = this._taskPanelData.task;
        switch (selectedHeader.fieldIdentifier) {
            case TaskMetaField.CASE:
                return task.caseTitle;
            case TaskMetaField.TITLE:
                return task.title;
            case TaskMetaField.PRIORITY:
                // TODO priority
                if (!task.priority || task.priority < 2) {
                    return 'high';
                }
                if (task.priority === 2) {
                    return 'medium';
                }
                return 'low';
            case TaskMetaField.USER:
                return task.user ? task.user.fullName : '';
            case TaskMetaField.ASSIGN_DATE:
                return task.startDate ? toMoment(task.startDate).format(DATE_TIME_FORMAT_STRING) : '';
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): string {
        this._log.warn('Immediate data in task panel headers are currently not supported');
        return '';
    }

}
