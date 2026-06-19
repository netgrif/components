import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {PlaceChange} from '../../../history-mode/model/place/place-change';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class RemoveTokenTool extends CanvasTool {

    public static ID = 'RemoveTokenTool';

    constructor(context: CanvasToolContext) {
        super(
            RemoveTokenTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('remove_circle_outline', false, true),
                'Remove token',
            ),
            context
        );
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceUp(event, place);
        if (this.isLeftButtonClick(event)) {
            this.removeTokenFrom(place);
        }
    }

    removeTokenFrom(place: CanvasPlace): void {
        if (place.modelPlace.marking < 1) {
            return;
        }
        const changed = new PlaceChange(place.modelPlace, place.modelPlace, undefined);
        changed.place.marking -= 1;
        this.modelService.updatePlace(changed);
        this.historyService.save(`Token has been removed from place ${place.id}.`);
    }
}
