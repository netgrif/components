import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class ResetPositionAndZoomTool extends CanvasTool {

    public static readonly ID = 'ResetPositionAndZoomTool';

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            ResetPositionAndZoomTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('fit_screen', false, true),
                translateService.instant('builder.modeler.edit-mode.services.resetCanvas'),
            ),
            context,
            translateService
        );
    }

    onClick(): void {
        super.onClick();
        this.editModeService.panzoom?.reset();
    }
}
