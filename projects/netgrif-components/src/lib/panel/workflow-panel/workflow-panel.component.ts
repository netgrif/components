import {Component} from '@angular/core';
import {AbstractWorkflowPanelComponent, LoggerService, WorkflowViewService, PetriNetResourceService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-workflow-panel',
    templateUrl: './workflow-panel.component.html',
    styleUrls: ['./workflow-panel.component.scss']
})
export class WorkflowPanelComponent extends AbstractWorkflowPanelComponent {
    constructor(log: LoggerService,
                translate: TranslateService,
                workflowService: WorkflowViewService,
                petriNetResource: PetriNetResourceService) {
        super(log, translate, workflowService, petriNetResource);
    }
}
