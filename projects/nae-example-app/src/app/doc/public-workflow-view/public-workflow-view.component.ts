import {Component} from '@angular/core';
import {
    AbstractWorkflowViewComponent,
    WorkflowViewService,
    LoggerService,
    ProcessService,
    Net,
    ProcessServiceProvider,
    PetriNetResourceServiceProvider
} from '@netgrif/components-core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'nae-app-public-workflow-view',
    templateUrl: './public-workflow-view.component.html',
    styleUrls: ['./public-workflow-view.component.scss'],
    providers: [
        WorkflowViewService,
        ProcessServiceProvider,
        PetriNetResourceServiceProvider,
    ],
    standalone: false
})
export class PublicWorkflowViewComponent extends AbstractWorkflowViewComponent {
    constructor(protected _dialog: MatDialog,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService,
                protected _router: Router,
                protected _route: ActivatedRoute) {
        super(_dialog, _workflowViewService, _log, _processService);
    }

    handleClick(workflow: Net) {
        this._router.navigate([this._route.snapshot.url.join('/') + '/' + btoa(workflow.identifier)]);
    }
}
