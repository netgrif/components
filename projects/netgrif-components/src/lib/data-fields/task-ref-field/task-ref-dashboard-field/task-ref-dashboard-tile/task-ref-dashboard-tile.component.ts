import {Component} from '@angular/core';
import {AbstractTaskRefDashboardTileComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-task-ref-dashboard-tile',
    templateUrl: './task-ref-dashboard-tile.component.html',
    styleUrls: ['./task-ref-dashboard-tile.component.scss']
})
export class TaskRefDashboardTileComponent extends AbstractTaskRefDashboardTileComponent {

    constructor() {
        super();
    }

}
