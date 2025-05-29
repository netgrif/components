import {Component} from '@angular/core';
import {
    AbstractWorkflowViewComponent,
    LoggerService,
    ProcessService,
    WorkflowViewService
} from '@netgrif/components-core';
import {MatDialog} from '@angular/material/dialog';
import {ImportNetDialogComponent} from '../../dialog/import-net-dialog/import-net-dialog.component';


@Component({
    selector: 'nc-workflow-view',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss'],
    providers: [WorkflowViewService],
    standalone: false
})
export class WorkflowViewComponent extends AbstractWorkflowViewComponent {
    constructor(protected _dialog: MatDialog,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService) {
        super(_dialog, _workflowViewService, _log, _processService);
    }

    public importNet() {
        this.importSidemenuNet(ImportNetDialogComponent);
    }
}
