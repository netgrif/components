import {Component, Inject, OnInit, Optional} from "@angular/core";
import {TaskRefField} from "../model/task-ref-field";
import {TaskRefDashboardTile} from "../model/task-ref-dashboard-tile";
import {LoggerService} from "../../../logger/services/logger.service";
import {TaskRefDashboardConstants} from "../model/task-ref-dashboard-constants";
import {TaskRefDashboardTileConstants} from "../model/task-ref-dashboard-tile-constants";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TranslateService} from "@ngx-translate/core";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-task-ref-dashboard',
    template: ''
})
export abstract class AbstractTaskRefDashboardFieldComponent extends AbstractBaseDataFieldComponent<TaskRefField> implements OnInit {

    dashboardTiles: Array<TaskRefDashboardTile>;
    protected constructor(protected _logger: LoggerService,
                          protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    ngOnInit() {
        this.createDashboardTiles();
    }

    protected createDashboardTiles() {
        const gridRows = this.dataField.dashboardRows;
        if (gridRows === undefined) {
            this._logger.error(`TaskRef Dashboard '${this.dataField.stringId}' does not specify grid height! Add a number field with id '${TaskRefDashboardConstants.DASHBOARD_ROWS}' to the same task as the task ref field, to specify the height.`);
        }
        const gridCols = this.dataField.dashboardCols;
        if (gridCols === undefined) {
            this._logger.error(`TaskRef Dashboard '${this.dataField.stringId}' does not specify grid width! Add a number field with id '${TaskRefDashboardConstants.DASHBOARD_COLS}' to the same task as the task ref field, to specify the width.`);
        }
        const occupiedTiles = this.createFlagGrid(gridRows, gridCols);
        this.dashboardTiles = [];
        if (this.dataField.dashboardTiles && this.dataField.dashboardTiles.length > 0) {
            for (const extractedTile of this.dataField.dashboardTiles) {
                const tile = this.createDashboardTile(extractedTile);
                this.dashboardTiles.push(tile);
                this.occupySpace(occupiedTiles, tile.y, tile.x, tile.cols, tile.rows);
            }
        }
        for (let y = 0; y < occupiedTiles.length; y++) {
            for (let x = 0; x < occupiedTiles[y].length; x++) {
                if (!occupiedTiles[y][x]) {
                    this.dashboardTiles.push(this.createEmptyDashboardTile(x, y));
                }
            }
        }
    }

    protected createFlagGrid(rows: number = 1, cols: number = 1): Array<Array<boolean>> {
        const result = [];
        for (let r = 0; r < rows; r++) {
            result.push(Array(cols).fill(false));
        }
        return result;
    }

    protected createDashboardTile(tile: TaskRefDashboardTile): TaskRefDashboardTile {
        const result: TaskRefDashboardTile = {
            dataGroups: tile.dataGroups
        };

        for (const dg of tile.dataGroups) {
            for (const field of dg.fields) {
                switch (field.stringId) {
                    case TaskRefDashboardTileConstants.DASHBOARD_TILE_X:
                        result.x = field.value;
                        break;
                    case TaskRefDashboardTileConstants.DASHBOARD_TILE_Y:
                        result.y = field.value;
                        break;
                    case TaskRefDashboardTileConstants.DASHBOARD_TILE_ROWS:
                        result.rows = field.value;
                        break;
                    case TaskRefDashboardTileConstants.DASHBOARD_TILE_COLS:
                        result.cols = field.value;
                        break;

                }
            }
        }

        if (result.x === undefined) {
            if (tile.dataGroups.length > 0) {
                this._logger.error(`Task ref dashboard tile from task '${tile.dataGroups[0].parentTaskId}' transition '${tile.dataGroups[0].parentTransitionId}' case '${tile.dataGroups[0].parentCaseId}' does not specify tile grid X coordinate! Add a number field with ID '${TaskRefDashboardTileConstants.DASHBOARD_TILE_X}' to the referenced task to specify it.`);
            }
            result.x = 0;
        }
        if (result.y === undefined) {
            if (tile.dataGroups.length > 0) {
                this._logger.error(`Task ref dashboard tile from task '${tile.dataGroups[0].parentTaskId}' transition '${tile.dataGroups[0].parentTransitionId}' case '${tile.dataGroups[0].parentCaseId}' does not specify tile grid Y coordinate! Add a number field with ID '${TaskRefDashboardTileConstants.DASHBOARD_TILE_Y}' to the referenced task to specify it.`);
            }
            result.y = 0;
        }
        if (result.rows === undefined) {
            if (tile.dataGroups.length > 0) {
                this._logger.error(`Task ref dashboard tile from task '${tile.dataGroups[0].parentTaskId}' transition '${tile.dataGroups[0].parentTransitionId}' case '${tile.dataGroups[0].parentCaseId}' does not specify tile height coordinate! Add a number field with ID '${TaskRefDashboardTileConstants.DASHBOARD_TILE_ROWS}' to the referenced task to specify it.`);
            }
            result.rows = 1;
        }
        if (result.cols === undefined) {
            if (tile.dataGroups.length > 0) {
                this._logger.error(`Task ref dashboard tile from task '${tile.dataGroups[0].parentTaskId}' transition '${tile.dataGroups[0].parentTransitionId}' case '${tile.dataGroups[0].parentCaseId}' does not specify tile width coordinate! Add a number field with ID '${TaskRefDashboardTileConstants.DASHBOARD_TILE_COLS}' to the referenced task to specify it.`);
            }
            result.cols = 1;
        }

        return result;
    }

    // TODO a modified copy of a method of the same name from AbstractTaskContentComponent
    protected occupySpace(grid: Array<Array<boolean>>, y: number, x: number, width: number, height: number) {
        for (let j = y; j < y + height; j++) {
            for (let i = x; i < x + width; i++) {
                grid[j][i] = true;
            }
        }
    }

    protected createEmptyDashboardTile(x: number, y: number): TaskRefDashboardTile {
        return {
            dataGroups: [],
            x,
            y,
            rows: 1,
            cols: 1,
            isEmpty: true
        }
    }
}
