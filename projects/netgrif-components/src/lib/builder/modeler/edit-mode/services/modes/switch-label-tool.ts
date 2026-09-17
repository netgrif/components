import {NodeElement} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class SwitchLabelTool extends CanvasTool {

    public static readonly ID = 'SwitchLabelTool';
    public static readonly ICON_ON = 'label';
    public static readonly ICON_OFF = 'label_off';
    private turnedOn = true;

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            SwitchLabelTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon(SwitchLabelTool.ICON_ON, false, true),
                translateService.instant('builder.modeler.edit-mode.services.showIds'),
            ),
            context,
            translateService
        );
    }

    onClick(): void {
        super.onClick();
        // TODO: NAB-326 abstract class for switches, make sure they turn to default state on canvas render
        if (this.turnedOn) {
            this.icon.name = SwitchLabelTool.ICON_OFF;
            this.tooltip = this._translateService.instant('builder.modeler.edit-mode.services.showLabels');
            this.editModeService.labelText = (n: NodeElement) => n.id;
        } else {
            this.icon.name = SwitchLabelTool.ICON_ON;
            this.tooltip = this._translateService.instant('builder.modeler.edit-mode.services.showIds');
            this.editModeService.labelText = (n: NodeElement) => n.label.value;
        }
        this.editModeService.elements.places.forEach(p => {
            p.svgElement.canvasElement.setLabelText(this.editModeService.labelText(p.modelPlace));
        })
        this.editModeService.elements.transitions.forEach(t => {
            t.svgTransition.canvasElement.setLabelText(this.editModeService.labelText(t.modelTransition));
        })
        this.turnedOn = !this.turnedOn;
    }
}
