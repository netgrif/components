import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractWorkflowPanelComponent,
    WorkflowViewService,
    LoggerService,
    OverflowService
} from '@netgrif/components-core';

@Component({
  selector: 'nc-public-workflow-panel',
  templateUrl: './public-workflow-panel.component.html',
  styleUrls: ['./public-workflow-panel.component.scss']
})
export class PublicWorkflowPanelComponent extends AbstractWorkflowPanelComponent {
    constructor(log: LoggerService, translate: TranslateService, workflowService: WorkflowViewService, overflowService: OverflowService) {
        super(log, translate, workflowService, overflowService);
    }
}
