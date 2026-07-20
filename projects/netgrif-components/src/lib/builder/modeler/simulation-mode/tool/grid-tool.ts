import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';
import {SimulationTool} from './simulation-tool';

export class GridTool extends SimulationTool {

    public static readonly ID = 'GridTool';
    public static readonly ICON_ON = 'grid_on';
    public static readonly TOOLTIP_ON = 'Hide grid';
    public static readonly ICON_OFF = 'grid_off';
    public static readonly TOOLTIP_OFF = 'Show grid';

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService
    ) {
        super(
            GridTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon(GridTool.ICON_ON, false, true),
                GridTool.TOOLTIP_ON,
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService
        );
    }

    onClick(): void {
        this.canvasService.gridOnOff();
        let newIcon = GridTool.ICON_OFF;
        let newTooltip = GridTool.TOOLTIP_OFF;
        if (this.canvasService.gridConfiguration.enabled) {
            newIcon = GridTool.ICON_ON;
            newTooltip = GridTool.TOOLTIP_ON;
        }
        this.icon.name = newIcon;
        this.tooltip = newTooltip;
    }
}
