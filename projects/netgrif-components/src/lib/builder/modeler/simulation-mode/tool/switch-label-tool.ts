import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NodeElement} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../selected-transition.service';
import {ModelService} from '../../services/model/model.service';
import {SimulationModeService} from '../simulation-mode.service';
import {SimulationTool} from './simulation-tool';

export class SwitchLabelTool extends SimulationTool {

    public static readonly ID = 'SwitchLabelTool';
    public static readonly ICON_ON = 'label';
    public static readonly TOOLTIP_ON = 'Show IDs';
    public static readonly ICON_OFF = 'label_off';
    public static readonly TOOLTIP_OFF = 'Show labels';
    private turnedOn = true;

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        simulationModeService: SimulationModeService,
        router: Router,
        transitionService: SelectedTransitionService
    ) {
        super(
            SwitchLabelTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon(SwitchLabelTool.ICON_ON, false, true),
                SwitchLabelTool.TOOLTIP_ON,
            ),
            modelService,
            dialog,
            simulationModeService,
            router,
            transitionService
        );
    }

    onClick(): void {
        // TODO: NAB-326 abstract class for switches, make sure they turn to default state on canvas render
        if (this.turnedOn) {
            this.icon.name = SwitchLabelTool.ICON_OFF;
            this.tooltip = SwitchLabelTool.TOOLTIP_OFF;
            this.simulationModeService.labelText = (n: NodeElement) => n.id;
        } else {
            this.icon.name = SwitchLabelTool.ICON_ON;
            this.tooltip = SwitchLabelTool.TOOLTIP_ON;
            this.simulationModeService.labelText = (n: NodeElement) => n.label.value;
        }
        this.elements.places.forEach(p => {
            p.svgElement.canvasElement.setLabelText(this.simulationModeService.labelText(p.modelPlace));
        });
        this.elements.transitions.forEach(t => {
            t.svgTransition.canvasElement.setLabelText(this.simulationModeService.labelText(t.modelTransition));
        });
        this.turnedOn = !this.turnedOn;
    }
}
