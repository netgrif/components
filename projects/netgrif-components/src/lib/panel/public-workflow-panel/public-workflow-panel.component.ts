import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractWorkflowPanelComponent,
    WorkflowViewService,
    LoggerService
} from '@netgrif/application-engine';

@Component({
  selector: 'nc-public-workflow-panel',
  templateUrl: './public-workflow-panel.component.html',
  styleUrls: ['./public-workflow-panel.component.scss']
})
export class PublicWorkflowPanelComponent extends AbstractWorkflowPanelComponent {
    constructor(log: LoggerService, translate: TranslateService, workflowService: WorkflowViewService) {
        super(log, translate, workflowService);
    }
}
