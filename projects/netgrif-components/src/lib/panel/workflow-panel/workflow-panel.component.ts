import {Component} from '@angular/core';
import {AbstractWorkflowPanelComponent, LoggerService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-workflow-panel',
    templateUrl: './workflow-panel.component.html',
    styleUrls: ['./workflow-panel.component.scss']
})
export class WorkflowPanelComponent extends AbstractWorkflowPanelComponent {
    constructor(protected _log: LoggerService, protected _translate: TranslateService) {
        super(_log, _translate);
    }
}
