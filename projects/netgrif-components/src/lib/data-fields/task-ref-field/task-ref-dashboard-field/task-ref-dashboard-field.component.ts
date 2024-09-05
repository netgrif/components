import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {
    AbstractTaskRefDashboardFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    LoggerService,
    TaskRefDashboardTile,
    TaskRefField
} from '@netgrif/components-core';

@Component({
  selector: 'nc-task-ref-dashboard-field',
  templateUrl: './task-ref-dashboard-field.component.html',
  styleUrls: ['./task-ref-dashboard-field.component.scss']
})
export class TaskRefDashboardFieldComponent extends AbstractTaskRefDashboardFieldComponent {

    constructor(logger: LoggerService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(logger, dataFieldPortalData);
    }

    getGridColumns(): string {
        return `repeat(${this.dataField.dashboardCols}, 1fr)`;
    }

    getGridRows(): string {
        return `repeat(${this.dataField.dashboardRows}, minmax(320px, auto))`;
    }

    getTileGridColumn(tile: TaskRefDashboardTile): string {
        return `${tile.x + 1} / span ${tile.cols}`;
    }

    getTileGridRow(tile: TaskRefDashboardTile): string {
        return `${tile.y + 1} / span ${tile.rows}`;
    }
}
