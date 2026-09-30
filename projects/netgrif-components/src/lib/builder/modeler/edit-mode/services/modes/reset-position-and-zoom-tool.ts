import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class ResetPositionAndZoomTool extends CanvasTool {

    public static readonly ID = 'ResetPositionAndZoomTool';

    constructor(context: CanvasToolContext) {
        super(
            ResetPositionAndZoomTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('fit_screen', false, true),
                context.translateService.instant('builder.modeler.edit-mode.services.resetCanvas'),
            ),
            context,
        );
    }

    onClick(): void {
        super.onClick();
        this.editModeService.panzoom?.reset();
    }
}
