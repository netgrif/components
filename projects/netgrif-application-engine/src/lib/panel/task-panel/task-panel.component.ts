import {AfterViewInit, Component, Injector, Input, OnInit, StaticProvider, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {NAE_TASK_COLS, TaskPanelContentComponent} from './task-panel-content/task-panel-content.component';
import {TaskPanelContentService} from './task-panel-content/task-panel-content.service';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldConvertorService} from './task-panel-content/field-convertor.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserService} from '../../user/services/user.service';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from './policy';
import {Observable, Subject} from 'rxjs';
import {TaskViewService} from '../../view/task-view/task-view.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {take} from 'rxjs/operators';
import {HeaderColumn} from '../../header/models/header-column';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {TaskMetaField} from '../../header/task-header/task-header.service';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {EnumerationField, EnumerationFieldValue} from '../../data-fields/enumeration-field/models/enumeration-field';
import {MultichoiceField} from '../../data-fields/multichoice-field/models/multichoice-field';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';


@Component({
    selector: 'nae-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    providers: [TaskPanelContentService]
})
export class TaskPanelComponent extends PanelWithHeaderBinding implements OnInit, AfterViewInit {

    @Input() taskPanelData: TaskPanelData;
    @Input() panelContentComponent: Type<any>;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;

    public portal: ComponentPortal<any>;
    public loading: boolean;
    public panelRef: MatExpansionPanel;
    private _updating: boolean;
    private _queue: Subject<boolean>;

    constructor(private _taskPanelContentService: TaskPanelContentService, private _fieldConvertorService: FieldConvertorService,
                private _log: LoggerService, private _snackBar: SnackBarService, private _taskService: TaskResourceService,
                private _sideMenuService: SideMenuService, private _userService: UserService, private _taskViewService: TaskViewService,
                private _translate: TranslateService, private _paperView: PaperViewService) {
        super();
        this.loading = false;
        this._updating = false;
        this._queue = new Subject<boolean>();
    }

    ngOnInit() {
        super.ngOnInit();
        this._taskViewService.taskData.subscribe(() => this.resolveFeaturedFieldsValues());
        let cols: number;
        if (this.taskPanelData.task && this.taskPanelData.task.layout && this.taskPanelData.task.layout.cols) {
            cols = this.taskPanelData.task.layout.cols;
        }

        const providers: StaticProvider[] = [
            {provide: NAE_TASK_COLS, useValue: cols},
            {provide: TaskPanelContentService, useValue: this._taskPanelContentService}
        ];
        const injector = Injector.create({providers});

        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskPanelContentComponent, null, injector);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent, null, injector);
        }
        this.taskPanelData.changedFields.subscribe(chFields => {
            this.updateFromChangedFields(chFields);
        });
    }

    ngAfterViewInit() {
        this.panelRef.opened.subscribe(() => {
            if (!this.loading) {
                this.buildAssignPolicy(true);
            }
        });
        this.panelRef.closed.subscribe(() => {
            if (!this.loading) {
                this.buildAssignPolicy(false);
            }
        });
        this.panelRef.afterExpand.subscribe(() => {
            this.blockFields(!this.canFinish());
        });
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
        if (this.taskPanelData.task.dataSize > 0) {
            afterAction.next(true);
            return;
        }
        this.loading = true;
        this._taskService.getData(this.taskPanelData.task.stringId).subscribe(dataGroups => {
            this.taskPanelData.task.dataGroups = [];
            if (dataGroups instanceof Array) {
                dataGroups.forEach(group => {
                        const dataGroup: DataField<any>[] = [];
                        if (group.fields._embedded) {
                            Object.keys(group.fields._embedded).forEach(item => {
                                dataGroup.push(...group.fields._embedded[item].map(df => this._fieldConvertorService.toClass(df)));
                            });
                            dataGroup.forEach(field => {
                                field.valueChanges().subscribe(newValue => {
                                    if (field.initialized && field.valid && field.changed) {
                                        this.updateTaskDataFields();
                                    }
                                });
                            });
                            this.taskPanelData.task.dataGroups.push({
                                fields: dataGroup,
                                stretch: group.stretch,
                                title: group.title,
                                layout: group.layout,
                                alignment: group.alignment
                            });
                            this.taskPanelData.task.dataSize += dataGroup.length;
                        } else {
                            this._log.info(this._translate.instant('tasks.snackbar.noData') + ' ' + this.taskPanelData.task);
                            this.loading = false;
                            afterAction.next(true);
                        }
                    }
                );
                this.loading = false;
                afterAction.next(true);
            } else {
                this._log.info(this._translate.instant('tasks.snackbar.noGroup') + ' ' + this.taskPanelData.task);
                this.loading = false;
                afterAction.next(false);
            }
            this._taskPanelContentService.$shouldCreate.next(this.taskPanelData.task.dataGroups);
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.noGroup')}
             ${this.taskPanelData.task} ${this._translate.instant('tasks.snackbar.failedToLoad')}`);
            this._log.debug(error);
            this.loading = false;
            afterAction.next(false);
        });
    }

    public updateTaskDataFields(afterAction = new Subject<boolean>()): void {
        if (this.taskPanelData.task.dataSize <= 0) {
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
        this.taskPanelData.task.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (field.initialized && field.valid && field.changed) {
                    body[field.stringId] = {
                        type: this._fieldConvertorService.resolveType(field),
                        value: this._fieldConvertorService.formatValue(field, field.value)
                    };
                }
            });
        });

        if (Object.keys(body).length === 0) {
            afterAction.next(true);
            return;
        }

        this.loading = true;
        this._updating = true;
        this._taskService.setData(this.taskPanelData.task.stringId, body).subscribe(response => {
            if (response.changedFields && (Object.keys(response.changedFields).length !== 0)) {
                this.taskPanelData.changedFields.next(response.changedFields as ChangedFields);
            }
            Object.keys(body).forEach(id => {
                this.taskPanelData.task.dataGroups.forEach(dataGroup => {
                    const changed = dataGroup.fields.find(f => f.stringId === id);
                    if (changed !== undefined) {
                        changed.changed = false;
                    }
                });
            });
            this._snackBar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.dataSaved'));
            this.loading = false;
            this._updating = false;
            if (this._queue.observers.length !== 0) {
                this._queue.next(true);
            }
            afterAction.next(true);
        }, error => {
            this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.failedSave'));
            this._log.debug(error);
            this.loading = false;
            this._updating = false;
            if (this._queue.observers.length !== 0) {
                this._queue.next(false);
            }
            afterAction.next(false);
            this._taskViewService.loadTasks();
        });
    }

    private updateFromChangedFields(chFields): void {
        this.taskPanelData.task.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (chFields[field.stringId]) {
                    const updatedField = chFields[field.stringId];
                    Object.keys(updatedField).forEach(key => {
                        if (key === 'value') {
                            field.value = this._fieldConvertorService.formatValue(field, updatedField[key]);
                            field.changed = false;
                        } else if (key === 'behavior' && updatedField.behavior[this.taskPanelData.task.transitionId]) {
                            field.behavior = updatedField.behavior[this.taskPanelData.task.transitionId];
                        } else if (key === 'choices') {
                            const newChoices: EnumerationFieldValue[] = [];
                            if (updatedField.choices instanceof Array) {
                                updatedField.choices.forEach(it => {
                                    newChoices.push({key: it, value: it} as EnumerationFieldValue);
                                });
                            } else {
                                Object.keys(updatedField.choices).forEach( choice => {
                                    newChoices.push({key: choice, value: updatedField.choices[key]} as EnumerationFieldValue);
                                });
                            }
                            (field as EnumerationField | MultichoiceField).choices = newChoices;
                        } else {
                            field[key] = updatedField[key];
                        }
                        field.update();
                    });
                }
            });
        });
        this._taskPanelContentService.$shouldCreate.next(this.taskPanelData.task.dataGroups);
    }

    processTask(type: string) {
        const after = new Subject<boolean>();
        after.subscribe(bool => {
            if (bool) {
                this._taskViewService.loadTasks();
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
        if (this.loading) {
            return;
        }
        if (this.taskPanelData.task.user) {
            afterAction.next(true);
            return;
        }
        this.loading = true;
        this._taskService.assignTask(this.taskPanelData.task.stringId).subscribe(response => {
            this.loading = false;
            if (response.success) {
                this.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
             ${this.taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this._log.debug(error);
            this.loading = false;
            afterAction.next(false);
        });
    }

    delegate(afterAction = new Subject<boolean>()) {
        if (this.loading) {
            return;
        }
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM).onClose.subscribe(event => {
            console.log(event);
            if (event.data !== undefined) {
                this.loading = true;

                this._taskService.delegateTask(this.taskPanelData.task.stringId, event.data.id).subscribe(response => {
                    this.loading = false;
                    if (response.success) {
                        this.removeStateData();
                        afterAction.next(true);
                    } else if (response.error) {
                        this._snackBar.openErrorSnackBar(response.error);
                        afterAction.next(false);
                    }
                }, error => {
                    this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.assignTask')}
                     ${this.taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
                    this.loading = false;
                    afterAction.next(false);
                });
            }
        });

    }

    cancel(afterAction = new Subject<boolean>()) {
        if (this.loading) {
            return;
        }
        if (!this.taskPanelData.task.user || ((this.taskPanelData.task.user.email !== this._userService.user.email)
            && !this.canDo('cancel'))) {
            afterAction.next(false);
            return;
        }
        this.loading = true;
        this._taskService.cancelTask(this.taskPanelData.task.stringId).subscribe(response => {
            this.loading = false;
            if (response.success) {
                this.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.cancelTask')}
             ${this.taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.loading = false;
            afterAction.next(false);
        });
    }

    finish(afterAction = new Subject<boolean>()) {
        const after = new Subject<boolean>();
        if (this.taskPanelData.task.dataSize <= 0) {
            after.subscribe(boolean => {
                if (this.taskPanelData.task.dataSize <= 0 || this.validateTaskData()) {
                    this.sendFinishTaskRequest(afterAction);
                    this.collapse();
                }
                after.complete();
            });
            this.getTaskDataFields(after);
        } else {
            if (this.validateTaskData()) {
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
        if (this.loading) {
            return;
        }
        this.loading = true;
        this._taskService.finishTask(this.taskPanelData.task.stringId).subscribe(response => {
            this.loading = false;
            if (response.success) {
                this.removeStateData();
                afterAction.next(true);
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
                afterAction.next(false);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`${this._translate.instant('tasks.snackbar.finishTask')}
             ${this.taskPanelData.task} ${this._translate.instant('tasks.snackbar.failed')}`);
            this.loading = false;
            afterAction.next(false);
        });
    }

    private validateTaskData(): boolean {
        const valid = !this.taskPanelData.task.dataGroups.some(group => group.fields.some(field => !field.valid));
        if (!valid) {
            this._snackBar.openErrorSnackBar(this._translate.instant('tasks.snackbar.invalidData'));
            this.taskPanelData.task.dataGroups.forEach(group => group.fields.forEach(field => field.touch = true));
        }
        return valid;
    }

    collapse() {
        this.panelRef.close();
        this.panelRef.expanded = false;
    }

    expand() {
        this.panelRef.open();
        this.panelRef.expanded = true;
    }

    canDo(action) {
        if (!this.taskPanelData.task.roles || !action || !(this.taskPanelData.task.roles instanceof Object)) {
            return false;
        }
        return Object.keys(this.taskPanelData.task.roles).some(role =>
            this._userService.hasRoleById(role) ? this.taskPanelData.task.roles[role][action] : false
        );
    }

    canAssign() {
        return this.taskPanelData.task.assignPolicy === AssignPolicy.manual && !this.taskPanelData.task.user && this.canDo('perform');
    }

    canReassign() {
        return (this.taskPanelData.task.user && this.taskPanelData.task.user.email === this._userService.user.email)
            && (this.canDo('delegate'));
    }

    canCancel() {
        return (this.taskPanelData.task.assignPolicy === AssignPolicy.manual &&
            this.taskPanelData.task.user && this.taskPanelData.task.user.email === this._userService.user.email) ||
            (this.taskPanelData.task.user && this.canDo('cancel'));
    }

    canFinish() {
        return this.taskPanelData.task.user && this.taskPanelData.task.user.email === this._userService.user.email;
    }

    canColapse() {
        return this.taskPanelData.task.assignPolicy === AssignPolicy.manual;
    }

    private removeStateData(): void {
        this.taskPanelData.task.user = undefined;
        this.taskPanelData.task.startDate = undefined;
        this.taskPanelData.task.finishDate = undefined;
    }

    private buildAssignPolicy(success: boolean): void {
        if (this.taskPanelData.task.assignPolicy === AssignPolicy.auto) {
            this.autoAssignPolicy(success);
        } else {
            this.manualAssignPolicy(success);
        }
    }

    private autoAssignPolicy(success: boolean): void {
        const after = new Subject<boolean>();
        if (success) {
            after.subscribe(bool => {
                this._taskViewService.loadTasks();
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
                this._taskViewService.loadTasks();
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
        if (this.taskPanelData.task.finishPolicy === FinishPolicy.autoNoData) {
            this.autoNoDataFinishPolicy(success);
        } else {
            this.manualFinishPolicy(success);
        }
    }

    private autoNoDataFinishPolicy(success: boolean): void {
        if (success) {
            if (this.taskPanelData.task.dataSize <= 0) {
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
        if (this.taskPanelData.task.dataFocusPolicy === DataFocusPolicy.autoRequired) {
            this.autoRequiredDataFocusPolicy(success);
        }
    }

    private autoRequiredDataFocusPolicy(success: boolean) {
        if (success) {
            // TODO Implement focus in FUTURE, if someone wants this feature (for now we don't want it )
        }
    }

    private blockFields(bool: boolean) {
        if (this.taskPanelData.task.dataGroups) {
            this.taskPanelData.task.dataGroups.forEach(group => {
                group.fields.forEach(field => {
                    field.block = bool;
                });
            });
        }
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): string {
        const task = this.taskPanelData.task;
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
