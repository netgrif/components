import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';
import {TaskRefDashboardTile} from './task-ref-dashboard-tile';


/**
 * A collection of Task ref field component names supported by the application engine.
 */
export enum TaskRefComponents {
    DASHBOARD = 'dashboard'
}

/**
 * A collection of Task ref field dashboard component constants used to reference elements of the underlying processes
 */
export enum TaskRefDashboardConstants {
    DASHBOARD_ROWS = 'rows',
    DASHBOARD_COLS = 'cols',
    DASHBOARD_TASK_REF = 'dashboard',
}

/**
 * A collection of Task ref field dashboard tile component constants used to reference elements of the underlying processes
 */
export enum TaskRefDashboardTileConstants {
    DASHBOARD_TILE_X = 'x',
    DASHBOARD_TILE_Y = 'y',
    DASHBOARD_TILE_ROWS = 'rows',
    DASHBOARD_TILE_COLS = 'cols',
    DASHBOARD_TILE_PROCESS_IDENTIFIER = 'dashboard_tile'
}

export class TaskRefField extends DataField<Array<string>> {

    protected _dashboardTiles?: Array<TaskRefDashboardTile>;
    private _dashboardRows?: number;
    private _dashboardCols?: number;

    constructor(stringId: string, title: string, initialValue: Array<string>, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, initialValue, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    get dashboardTiles(): Array<TaskRefDashboardTile> {
        return this._dashboardTiles;
    }

    set dashboardTiles(value: Array<TaskRefDashboardTile>) {
        this._dashboardTiles = value;
    }

    get dashboardRows(): number {
        return this._dashboardRows;
    }

    set dashboardRows(value: number) {
        this._dashboardRows = value;
    }

    get dashboardCols(): number {
        return this._dashboardCols;
    }

    set dashboardCols(value: number) {
        this._dashboardCols = value;
    }
}
