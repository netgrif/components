import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class CreatePlaceTool extends CanvasTool {

    public static ID = 'CreatePlaceTool';

    constructor(context: CanvasToolContext) {
        super(
            CreatePlaceTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('circle', false, true),
                'Place',
            ),
            context
        );
    }

    onMouseUp(event: PointerEvent) {
        super.onMouseUp(event);
        if (this.isLeftButtonClick(event)) {
            const place = this.editModeService.createPlace(this.mousePosition(event));
            this.bindPlace(place);
            this.historyService.save(`Place ${place.id} has been created.`);
        }
    }
}
