import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {AbstractTaskRefFieldComponent, LoggerService, NAE_INFORM_ABOUT_INVALID_DATA, TaskRefDashboardTile} from '@netgrif/components-core';

@Component({
    selector: 'nc-task-ref-field',
    templateUrl: './task-ref-field.component.html',
    styleUrls: ['./task-ref-field.component.scss']
})
export class TaskRefFieldComponent extends AbstractTaskRefFieldComponent {

    @Input() taskContentComponentClassReference: Type<any>;

    constructor(logger: LoggerService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(logger, informAboutInvalidData);
    }

    getGridColumns(): string {
        return `repeat(${this.dataField.dashboardCols}, 1fr)`;
    }

    getGridRows(): string {
        return `repeat(${this.dataField.dashboardRows}, minmax(320px, auto))`;
    }

    getTileGridColumn(tile: TaskRefDashboardTile): string {
        return `${tile.x + 1} / ${tile.x + tile.cols}`;
    }

    getTileGridRow(tile: TaskRefDashboardTile): string {
        return `${tile.y + 1} / ${tile.y + tile.rows}`;
    }

}
