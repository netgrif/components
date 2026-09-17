import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class GridTool extends CanvasTool {

    public static readonly ID = 'GridTool';
    public static readonly ICON_ON = 'grid_on';
    public static readonly ICON_OFF = 'grid_off';

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            GridTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon(GridTool.ICON_ON, false, true),
                translateService.instant('builder.modeler.edit-mode.services.hideGrid'),
            ),
            context,
            translateService
        );
    }

    onClick(): void {
        super.onClick();
        this.editModeService.canvasService.gridOnOff();
        let newIcon = GridTool.ICON_OFF;
        let newTooltip = this._translateService.instant('builder.modeler.edit-mode.services.showGrid');
        if (this.editModeService.canvasService.gridConfiguration.enabled) {
            newIcon = GridTool.ICON_ON;
            newTooltip = this._translateService.instant('builder.modeler.edit-mode.services.hideGrid');
        }
        this.icon.name = newIcon;
        this.tooltip = newTooltip;
    }
}
