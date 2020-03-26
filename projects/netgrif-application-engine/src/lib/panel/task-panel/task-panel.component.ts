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
import {TaskResourceService} from '../../panel-list/abstract-task-service/abstract-task.service';

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

    constructor(private taskPanelContentService: TaskPanelContentService, private fieldConvertorService: FieldConvertorService,
                private log: LoggerService, private snackBar: SnackBarService, private taskService: TaskResourceService) {
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
    }

    ngAfterViewInit() {
        this.panelRef.opened.subscribe(() => {
            console.time('getSuccess');
            console.time('getEnd');
            this.getTaskDataFields();
        });
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

    public getTaskDataFields(): void {
        this.loading = true;
        this.taskService.getData(this.taskPanelData.task.stringId).subscribe(dataGroups => {
            console.timeEnd('getSuccess');
            this.taskPanelData.task.dataGroups = [];
            dataGroups.forEach(group => {
                    const dataGroup: DataField<any>[] = [];
                    if (group.fields._embedded) {
                        Object.keys(group.fields._embedded).forEach(item => {
                            dataGroup.push(...group.fields._embedded[item].map(df => this.fieldConvertorService.toClass(df)));
                        });
                        dataGroup.forEach(field => {
                            field.valueChanges().subscribe(() => {
                                if (field.initialized) {
                                    const body = {};
                                    body[field.stringId] = {
                                        type: this.fieldConvertorService.resolveType(field),
                                        value: this.fieldConvertorService.formatValue(field)
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
                        this.log.info(`No data for task TITLE`);
                        this.loading = false;
                    }
                }
            );
            console.timeEnd('getEnd');
            this.taskPanelContentService.$shouldCreate.next(this.taskPanelData.task.dataGroups);
            this.loading = false;
        }, error => {
            this.snackBar.openErrorSnackBar('Data for TITLE failed to load');
            this.log.debug(error);
            this.loading = false;
        });
    }

    public updateTaskDataFields(body: {}): void {
        this.loading = true;
        this.taskService.setData(this.taskPanelData.task.stringId, body).subscribe(response => {
            if (response.changedFields && (Object.keys(response.changedFields).length !== 0)) {
                this.taskPanelData.changedFields.next(response.changedFields); // TODO emit event and make this in parent
            }
            this.snackBar.openInfoSnackBar('Data saved successfully');
            this.loading = false;
        }, error => {
            this.snackBar.openErrorSnackBar('Saving data failed');
            this.log.debug(error);
            this.loading = false;
        });
    }
}
