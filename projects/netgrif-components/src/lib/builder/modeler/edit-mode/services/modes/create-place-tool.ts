import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class CreatePlaceTool extends CanvasTool {

    public static ID = 'CreatePlaceTool';

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            CreatePlaceTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('circle', false, true),
                translateService.instant('builder.modeler.edit-mode.services.place'),
            ),
            context,
            translateService
        );
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isLeftButtonClick(event)) {
            const place = this.editModeService.createPlace(this.mousePosition(event));
            this.bindPlace(place);
            this.historyService.save(this._translateService.instant('builder.modeler.edit-mode.services.place') + ` ${place.id} ` + this._translateService.instant('builder.modeler.edit-mode.services.hasBeenCreated'));
        }
    }
}
