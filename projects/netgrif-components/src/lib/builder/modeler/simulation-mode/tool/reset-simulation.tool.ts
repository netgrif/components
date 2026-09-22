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

export class ResetSimulationTool extends SimulationTool {

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        translateService: TranslateService,
        ngZone?: NgZone
    ) {
        super(
            'reset_simulation',
            new ControlPanelButton(
                new ControlPanelIcon('restart_alt'),
                translateService.instant('builder.modeler.simulation-mode.resetSimulation')
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService,
            ngZone
        );
    }

    onClick() {
        super.onClick();
        this.simulationModeService.activeTool.reset();
        this.simulationModeService.originalModel.next(this.modelService.model);
    }
}
