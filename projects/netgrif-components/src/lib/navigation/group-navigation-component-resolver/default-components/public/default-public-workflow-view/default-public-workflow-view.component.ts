import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {
    AbstractWorkflowViewComponent,
    LoggerService,
    Net,
    PetriNetResourceServiceProvider,
    ProcessService,
    ProcessServiceProvider,
    WorkflowViewService,
    encodeBase64
} from '@netgrif/components-core';

@Component({
    selector: 'nc-default-public-workflow-view',
    templateUrl: './default-public-workflow-view.component.html',
    styleUrls: ['./default-public-workflow-view.component.scss'],
    providers: [
        WorkflowViewService,
        ProcessServiceProvider,
        PetriNetResourceServiceProvider,
    ]
})
export class DefaultPublicWorkflowViewComponent extends AbstractWorkflowViewComponent {
    constructor(protected _dialog: MatDialog,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService,
                protected _router: Router,
                protected _route: ActivatedRoute) {
        super(_dialog, _workflowViewService, _log, _processService);
    }

    handleClick(workflow: Net) {
        let encodedIdentifier = encodeBase64(workflow.identifier);
        encodedIdentifier = encodedIdentifier.replace(/=+$/, '');
        this._router.navigate([this._route.snapshot.url.join('/') + '/' + encodedIdentifier]);
    }

}
