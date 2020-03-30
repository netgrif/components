import {AfterViewInit, Component, Input, OnInit, Type} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {TaskPanelContentComponent} from './task-panel-content/task-panel-content.component';
import {TaskPanelContentService} from './task-panel-content/task-panel-content.service';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldConvertorService} from './task-panel-content/field-convertor.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {TaskPanelData} from '../../panel-list/task-panel-data/task-panel-data';
import {TaskResourceService} from '../../panel-list/task-resource/task-resource.service';
import {UserAssignComponent} from '../../side-menu/user-assign/user-assign.component';
import {SideMenuService, SideMenuWidth} from '../../side-menu/services/side-menu.service';
import {UserService} from '../../user/services/user.service';
import {AssignPolicy} from './policy';

@Component({
    selector: 'nae-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    providers: [TaskPanelContentService]
})
export class TaskPanelComponent implements OnInit, AfterViewInit {

    @Input() taskPanelData: TaskPanelData;
    @Input() panelContentComponent: Type<any>;

    public portal: ComponentPortal<any>;
    public loading: boolean;
    public panelIcon: string;
    public panelIconField: string;
    public panelRef: MatExpansionPanel;

    constructor(private _taskPanelContentService: TaskPanelContentService, private _fieldConvertorService: FieldConvertorService,
                private _log: LoggerService, private _snackBar: SnackBarService, private _taskService: TaskResourceService,
                private _sideMenuService: SideMenuService, private _userService: UserService) {
        this.loading = false;
    }

    ngOnInit() {
        if (this.taskPanelData.header !== undefined) {
            this.panelIcon = this.taskPanelData.header.panelIcon;
            this.panelIconField = this.taskPanelData.header.panelIconField;
        } else {
            this.taskPanelData.header = {featuredFields: [], panelIcon: '', panelIconField: '', taskId: ''};
        }
        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskPanelContentComponent);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent);
        }
        this.taskPanelData.changedFields.subscribe(chFields => {
            // this.updateFromChangedFields(chFields);
        });
    }

    ngAfterViewInit() {
        this.panelRef.opened.subscribe(() => {
            this.getTaskDataFields();
        });
        this.canDo('delegate');
    }

    public show($event: MouseEvent): boolean {
        $event.stopPropagation();
        return false;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

    public getTaskDataFields(): void {
        this.loading = true;
        this._taskService.getData(this.taskPanelData.task.stringId).subscribe(dataGroups => {
            this.taskPanelData.task.dataGroups = [];
            dataGroups.forEach(group => {
                    const dataGroup: DataField<any>[] = [];
                    if (group.fields._embedded) {
                        Object.keys(group.fields._embedded).forEach(item => {
                            dataGroup.push(...group.fields._embedded[item].map(df => this._fieldConvertorService.toClass(df)));
                        });
                        dataGroup.forEach(field => {
                            field.valueChanges().subscribe(newValue => {
                                if (field.initialized) {
                                    const body = {};
                                    body[field.stringId] = {
                                        type: this._fieldConvertorService.resolveType(field),
                                        value: this._fieldConvertorService.formatValue(field, newValue)
                                    };
                                    this.updateTaskDataFields(body);
                                }
                            });
                        });
                        this.taskPanelData.task.dataGroups.push({
                            fields: dataGroup,
                            stretch: group.stretch,
                            title: group.title,
                            cols: group.cols,
                            alignment: group.alignment
                        });
                    } else {
                        this._log.info(`No data for task ${this.taskPanelData.task}`);
                        this.loading = false;
                    }
                }
            );
            this._taskPanelContentService.$shouldCreate.next(this.taskPanelData.task.dataGroups);
            this.loading = false;
        }, error => {
            this._snackBar.openErrorSnackBar(`Data for ${this.taskPanelData.task} failed to load`);
            this._log.debug(error);
            this.loading = false;
        });
    }

    public updateTaskDataFields(body: {}): void {
        this.loading = true;
        this._taskService.setData(this.taskPanelData.task.stringId, body).subscribe(response => {
            if (response.changedFields && (Object.keys(response.changedFields).length !== 0)) {
                this.taskPanelData.changedFields.next(response.changedFields);
            }
            this._snackBar.openInfoSnackBar('Data saved successfully');
            this.loading = false;
        }, error => {
            this._snackBar.openErrorSnackBar('Saving data failed');
            this._log.debug(error);
            this.loading = false;
        });
    }

    private updateFromChangedFields(chFields): void {
        this.taskPanelData.task.dataGroups.forEach(dataGroup => {
            dataGroup.fields.forEach(field => {
                if (chFields[field.stringId]) {
                    const updatedField = chFields[field.stringId];
                    Object.keys(updatedField).forEach(key => {
                        if (key === 'value')
                            field.value = this._fieldConvertorService.formatValue(field, updatedField[key]);
                        else if (key === 'behavior' && updatedField.behavior[this.taskPanelData.task.transitionId])
                            field.behavior = updatedField.behavior[this.taskPanelData.task.transitionId];
                        else
                            field[key] = updatedField[key];
                    });
                }
            });
        });
        this._taskPanelContentService.$shouldCreate.next(this.taskPanelData.task.dataGroups);
    }

    assign() {
        if (this.loading) {
            return;
        }
        if (this.taskPanelData.task.user) {
            return;
        }
        this.loading = true;
        this._taskService.assignTask(this.taskPanelData.task.stringId).subscribe(response => {
            this.loading = false;
            if (response.success) {
                // TODO remove some states ??
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`Assigning task ${this.taskPanelData.task} failed`);
            this._log.debug(error);
            this.loading = false;
        });
    }

    delegate() {
        if (this.loading) {
            return;
        }
        this._sideMenuService.open(UserAssignComponent, SideMenuWidth.MEDIUM).subscribe(

        );
        // this.loading = true;
        //
        // this.taskService.delegateTask(user.id).subscribe(response => {
        //     this.loading = false;
        //     if (response.success) {
        //         // TODO remove some states ??
        //     } else if (response.error) {
        //         this.snackBar.openErrorSnackBar(response.error);
        //     }
        // }, error => {
        //     this.snackBar.openErrorSnackBar(`Delegating task ${this.taskPanelData.task} failed`);
        //     this.loading = false;
        // });
    }

    cancel() {
        if (this.loading) {
            return;
        }
        if (!this.taskPanelData.task.user || ((this.taskPanelData.task.user.email !== this._userService.user.email)
            && !this.canDo('cancel'))) {
            return;
        }
        this.loading = true;
        this._taskService.cancelTask(this.taskPanelData.task.stringId).subscribe(response => {
            this.loading = false;
            if (response.success) {
                this.panelRef.expanded = false;
                // TODO remove some states ??
            } else if (response.error) {
                this._snackBar.openErrorSnackBar(response.error);
            }
        }, error => {
            this._snackBar.openErrorSnackBar(`Canceling assignment of task ${this.taskPanelData.task} failed`);
            this.loading = false;
        });
    }

    finish() {
        this.panelRef.expanded = false;
    }

    canDo(action) {
        if (!this.taskPanelData.task.roles || !action || !(this.taskPanelData.task.roles instanceof Object)) return false;
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
}
