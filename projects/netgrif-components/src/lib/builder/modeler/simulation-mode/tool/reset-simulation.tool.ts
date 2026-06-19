import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';
import {SimulationTool} from './simulation-tool';

export class ResetSimulationTool extends SimulationTool {

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService
    ) {
        super(
            'reset_simulation',
            new ControlPanelButton(
                new ControlPanelIcon('restart_alt'),
                'Reset simulation'
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService
        );
    }

    onClick() {
        super.onClick();
        this.simulationModeService.activeTool.reset();
        this.simulationModeService.originalModel.next(this.modelService.model);
    }
}
