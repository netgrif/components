import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractDashboardContentComponent, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DashboardContentComponent extends AbstractDashboardContentComponent {

    constructor(protected _log: LoggerService) {
        super(_log);
    }
}
