import {NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';
import {SimulationTool} from './simulation-tool';
import {TranslateService} from "@ngx-translate/core";

export class GridTool extends SimulationTool {

    public static readonly ID = 'GridTool';
    public static readonly ICON_ON = 'grid_on';
    public static readonly ICON_OFF = 'grid_off';

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        private _translateService: TranslateService,
        ngZone?: NgZone
    ) {
        super(
            GridTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon(GridTool.ICON_ON, false, true),
                _translateService.instant('builder.modeler.simulation-mode.hideGrid'),
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService,
            ngZone
        );
    }

    onClick(): void {
        this.canvasService.gridOnOff();
        let newIcon = GridTool.ICON_OFF;
        let newTooltip = this._translateService.instant('builder.modeler.simulation-mode.showGrid');
        if (this.canvasService.gridConfiguration.enabled) {
            newIcon = GridTool.ICON_ON;
            newTooltip = this._translateService.instant('builder.modeler.simulation-mode.hideGrid');
        }
        this.icon.name = newIcon;
        this.tooltip = newTooltip;
    }
}
