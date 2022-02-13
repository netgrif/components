import {Component} from '@angular/core';
import {AbstractDashboardContent, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent extends AbstractDashboardContent {

    constructor(protected _log: LoggerService) {
        super(_log);
    }
}
