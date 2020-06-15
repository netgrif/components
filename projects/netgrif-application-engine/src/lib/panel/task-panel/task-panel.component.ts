import {AfterViewInit, Component, Injector, Input, OnInit, StaticProvider, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {NAE_TASK_COLS, TaskContentComponent} from '../../task-content/task-panel-content/task-content.component';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {FieldConverterService} from '../../task-content/services/field-converter.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserService} from '../../user/services/user.service';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {Observable, Subject} from 'rxjs';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {filter, map, take} from 'rxjs/operators';
import {HeaderColumn} from '../../header/models/header-column';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {TaskMetaField} from '../../header/task-header/task-header.service';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AssignTaskService} from '../../task-content/services/assign-task.service';
import {LoadingEmitter} from '../../utility/loading-emitter';


@Component({
    selector: 'nae-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    providers: [
        TaskContentService,
        TaskEventService,
        AssignTaskService,
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
    public loading: LoadingEmitter;
    public panelRef: MatExpansionPanel;
    private _updating: boolean;
    private _queue: Subject<boolean>;

    constructor(private _taskContentService: TaskContentService,
                private _fieldConverterService: FieldConverterService,
                private _log: LoggerService,
                private _snackBar: SnackBarService,
                private _taskService: TaskResourceService,
                private _sideMenuService: SideMenuService,
                private _userService: UserService,
                private _taskViewService: TaskViewService,
                private _translate: TranslateService,
                private _paperView: PaperViewService,
                private _taskEventService: TaskEventService,
                private _assignTaskService: AssignTaskService) {
        super();
        this.loading = new LoadingEmitter();
        this._updating = false;
        this._queue = new Subject<boolean>();

        this._assignTaskService.setUp(this.loading);
    }

    ngOnInit() {
        super.ngOnInit();
        this._taskContentService.task = this._taskPanelData.task;

        // this._taskViewService.tasks$.subscribe(() => this.resolveFeaturedFieldsValues()); // TODO spraviť to inak ako subscribe
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
            if (!this.loading.isActive) {
                this.buildAssignPolicy(true);
            }
        });
        this.panelRef.closed.subscribe(() => {
            if (!this.loading.isActive) {
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

    @Input()
    public set taskPanelData(data: TaskPanelData) {
        this._taskPanelData = data;
        this.resolveFeaturedFieldsValues();
    }

    public get taskPanelData(): TaskPanelData {
        return this._taskPanelData;
    }

    public show($event: MouseEvent): boolean {
        $event.stopPropagation();
        return false;
    }

    public isPaperView() {
        return this._paperView.paperView;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

    public getTaskDataFields(afterAction = new Subject<boolean>()): void {
        if (this._taskPanelData.task.dataSize > 0) {
            afterAction.next(true);
            return;
        }
        this.loading.on();
        this._taskService.getData(this._taskPanelData.task.stringId).subscribe(dataGroups => {
            this._taskPanelData.task.dataGroups = dataGroups;
            if (dataGroups.length === 0) {
                this._log.info(this._translate.instant('tasks.snackbar.noData') + ' ' + this._taskPanelData.task);
                this.loading.off();
                this._taskPanelData.task.dataSize = 0;
                afterAction.next(true);
            } else {
                dataGroups.forEach(group => {
                    group.fields.forEach(field => {
                        field.valueChanges().subscribe(() => {
                            if (field.initialized && field.valid && field.changed) {
                                this.updateTaskDataFields();
                            }
                        });
                    });
                    this._taskPanelData.task.dataSize += group.fields.length;
                });
                this.loading.off();
                afterAction.next(true);
            }
            this._taskContentService.$shouldCreate.next(this._taskPanelData.task.dataGroups);
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.noGroup')}
             ${this._taskPanelData.task} ${this._translate.instant('tasks.snackbar.failedToLoad')}`);
            this._log.debug(error);
            this.loading.off();
            afterAction.next(false);
        });
    }

    public updateTaskDataFields(afterAction = new Subject<boolean>()): void {
        if (this._taskPanelData.task.dataSize <= 0) {
            return;
        }

        if (this._updating) {
            afterAction.next(true);
            return;
        }

        if (afterAction.observers.length === 0) {
            afterAction.subscribe(bool => {
                this.buildDataFocusPolicy(bool);
            });
        }

        const body = {};
        this._taskPanelData.task.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (field.initialized && field.valid && field.changed) {
                    body[field.stringId] = {
                        type: this._fieldConverterService.resolveType(field),
                        value: this._fieldConverterService.formatValue(field, field.value)
                    };
                }
            });
        });

        if (Object.keys(body).length === 0) {
            afterAction.next(true);
            return;
        }

        this.loading.on();
        this._updating = true;
        this._taskService.setData(this._taskPanelData.task.stringId, body).subscribe(response => {
            if (response.changedFields && (Object.keys(response.changedFields).length !== 0)) {
                this._taskPanelData.changedFields.next(response.changedFields as ChangedFields);
            }
            Object.keys(body).forEach(id => {
                this._taskPanelData.task.dataGroups.forEach(dataGroup => {
                    const changed = dataGroup.fields.find(f => f.stringId === id);
                    if (changed !== undefined) {
                        changed.changed = false;
                    }
                });
            });
            this._snackBar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.dataSaved'));
            this.loading.off();
            this._updating = false;
            if (this._queue.observers.length !== 0) {
                this._queue.next(true);
            }
            afterAction.next(true);
        }, error => {
            this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.failedSave'));
            this._log.debug(error);
            this.loading.off();
            this._updating = false;
            if (this._queue.observers.length !== 0) {
                this._queue.next(false);
            }
            afterAction.next(false);
            this._taskViewService.reloadCurrentPage();
        });
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
        if (this.loading.isActive) {
            return;
        }
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM).onClose.subscribe(event => {
            console.log(event);
            if (event.data !== undefined) {
                this.loading.on();

                this._taskService.delegateTask(this._taskPanelData.task.stringId, event.data.id).subscribe(response => {
                    this.loading.off();
                    if (response.success) {
                        this._taskContentService.removeStateData();
                        afterAction.next(true);
                    } else if (response.error) {
                        this._snackBar.openErrorSnackBar(response.error);
                        afterAction.next(false);
                    }
                }, error => {
                    this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
                     ${this._taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
                    this.loading.off();
                    afterAction.next(false);
                });
            }
        });

    }

    cancel(afterAction = new Subject<boolean>()) {
        if (this.loading.isActive) {
            return;
        }
        if (!this._taskPanelData.task.user || ((this._taskPanelData.task.user.email !== this._userService.user.email)
            && !this.canDo('cancel'))) {
            afterAction.next(false);
            return;
        }
        this.loading.on();
        this._taskService.cancelTask(this._taskPanelData.task.stringId).subscribe(response => {
            this.loading.off();
            if (response.success) {
                this._taskContentService.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.cancelTask')}
             ${this._taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.loading.off();
            afterAction.next(false);
        });
    }

    finish(afterAction = new Subject<boolean>()) {
        const after = new Subject<boolean>();
        if (this._taskPanelData.task.dataSize <= 0) {
            after.subscribe(boolean => {
                if (this._taskPanelData.task.dataSize <= 0 || this._taskContentService.validateTaskData()) {
                    this.sendFinishTaskRequest(afterAction);
                    this.collapse();
                }
                after.complete();
            });
            this.getTaskDataFields(after);
        } else {
            if (this._taskContentService.validateTaskData()) {
                after.subscribe(boolean => {
                    if (boolean) {
                        if (this._updating) {
                            this._queue.pipe(take(1)).subscribe(bool => {
                                if (bool) {
                                    this.sendFinishTaskRequest(afterAction);
                                    this.collapse();
                                }
                            });
                        } else {
                            this.sendFinishTaskRequest(afterAction);
                            this.collapse();
                        }
                    }
                    after.complete();
                });
                this.updateTaskDataFields(after);
            }
        }
    }

    private sendFinishTaskRequest(afterAction: Subject<boolean>) {
        if (this.loading.isActive) {
            return;
        }
        this.loading.on();
        this._taskService.finishTask(this._taskPanelData.task.stringId).subscribe(response => {
            this.loading.off();
            if (response.success) {
                this._taskContentService.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.finishTask')}
             ${this._taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.loading.off();
            afterAction.next(false);
        });
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
                    this.getTaskDataFields(afterLoad);
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
            this.getTaskDataFields(afterLoad);
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
                this.buildDataFocusPolicy(true);
            }
        }
    }

    private manualFinishPolicy(success: boolean): void {
        if (success) {
            this.expand();
            this.buildDataFocusPolicy(true);
        } else {
            this.getTaskDataFields();
        }
    }

    private buildDataFocusPolicy(success: boolean) {
        if (this._taskPanelData.task.dataFocusPolicy === DataFocusPolicy.autoRequired) {
            this.autoRequiredDataFocusPolicy(success);
        }
    }

    private autoRequiredDataFocusPolicy(success: boolean) {
        if (success) {
            // TODO Implement focus in FUTURE, if someone wants this feature (for now we don't want it )
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
