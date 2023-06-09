import {Component} from '@angular/core';
import {
    AbstractWorkflowViewComponent,
    LoggerService,
    ProcessService,
    SideMenuService,
    WorkflowViewService
} from '@netgrif/components-core';
import {ImportNetComponent} from '../../side-menu/content-components/import-net/import-net.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'nc-workflow-view',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss'],
    providers: [WorkflowViewService]
})
export class WorkflowViewComponent extends AbstractWorkflowViewComponent {
    constructor(protected _dialog: MatDialog,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService) {
        super(_dialog, _workflowViewService, _log, _processService);
    }

    public importNet() {
        this.importSidemenuNet(ImportNetComponent);
    }
}
