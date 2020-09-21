import {Component} from '@angular/core';
import {AbstractDashboardContent, LoggerService} from '@netgrif/application-engine';
import {ComponentPortal} from "@angular/cdk/portal";

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
