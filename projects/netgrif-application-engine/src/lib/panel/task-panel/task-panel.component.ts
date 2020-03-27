import {Component, Injector, Input, OnInit, StaticProvider, Type} from '@angular/core';
import {TaskPanelDefinition} from './task-panel-definition';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ComponentPortal} from '@angular/cdk/portal';
import {TaskPanelContentComponent} from './task-panel-content/task-panel-content.component';
import {NAE_TASK_DATA} from '../../panel-list/task-data-injection-token/task-data-injection-token.module';
import {TaskPanelContentService} from './task-panel-content/task-panel-content.service';
// import {TaskJsonResourceService} from '../../../../../nae-example-app/src/app/task-json-resource.service';

@Component({
    selector: 'nae-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

    @Input() resources: any;
    @Input() taskPanelDefinition: TaskPanelDefinition;
    @Input() panelContentComponent: Type<any>;

    public portal: ComponentPortal<any>;
    public showSpinner = false;
    public panelIcon: string;
    public panelIconField: string;
    public panelRef: MatExpansionPanel;
    public taskId: string;
    public panelOpenState = true;

    constructor(private taskPanelContentService: TaskPanelContentService) {
    }

    ngOnInit() {
        const providers: StaticProvider[] = [
            {provide: NAE_TASK_DATA, useValue: this.resources}
        ];
        const injector = Injector.create({providers});

        if (this.taskPanelDefinition !== undefined) {
            this.panelIcon = this.taskPanelDefinition.panelIcon;
            this.panelIconField = this.taskPanelDefinition.panelIconField;
            this.taskId = this.taskPanelDefinition.taskId;
        } else {
            this.taskPanelDefinition = {featuredFields: [], panelIcon: '', panelIconField: '', taskId: ''};
        }
        if (this.panelContentComponent === undefined) {
            this.portal = new ComponentPortal(TaskPanelContentComponent, null, injector);
        } else {
            this.portal = new ComponentPortal(this.panelContentComponent, null, injector);
        }
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    openTask() {
        if (this.panelOpenState) {
            console.log('aaaaa');
            console.log(this.taskId);

            // this._taskJsonResourceService.assignTask(this.taskId);      // TODO: auto assignTask
            // this._taskJsonResourceService.getData(this.taskId);
            // this._taskJsonResourceService.getData(this.taskId);
            // this.taskPanelContentService.$shouldCreate.emit();

        }
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

}
