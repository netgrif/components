import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {AbstractTaskRefFieldComponent, LoggerService, NAE_INFORM_ABOUT_INVALID_DATA, TaskRefDashboardTile} from '@netgrif/components-core';

/**
 * @deprecated
 * */
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
        return `${tile.x + 1} / span ${tile.cols}`;
    }

    getTileGridRow(tile: TaskRefDashboardTile): string {
        return `${tile.y + 1} / span ${tile.rows}`;
    }

}
