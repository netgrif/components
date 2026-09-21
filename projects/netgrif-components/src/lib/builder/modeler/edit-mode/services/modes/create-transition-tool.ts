import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class CreateTransitionTool extends CanvasTool {

    public static ID = 'CreateTransitionTool';

    constructor(context: CanvasToolContext) {
        super(
            CreateTransitionTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('square', false, true),
                context.translateService.instant('builder.modeler.edit-mode.services.transition'),
            ),
            context,
        );
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isLeftButtonClick(event)) {
            const canvasTransition = this.editModeService.createTransition(this.mousePosition(event));
            this.bindTransition(canvasTransition);
            this.historyService.save(this._translateService.instant('builder.modeler.edit-mode.services.task') + ` ${canvasTransition.id} ` + this._translateService.instant('builder.modeler.edit-mode.services.hasBeenCreated'));
        }
    }
}
