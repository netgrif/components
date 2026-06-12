import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {PlaceChange} from '../../../history-mode/model/place/place-change';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class AddTokenTool extends CanvasTool {

    public static readonly ID = 'AddTokenTool';

    constructor(context: CanvasToolContext) {
        super(
            AddTokenTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('add_circle_outline', false, true),
                'Add token',
            ),
            context
        );
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace) {
        super.onPlaceUp(event, place);
        if (this.isLeftButtonClick(event)) {
            this.addTokenTo(place);
        }
    }

    addTokenTo(place: CanvasPlace): void {
        const changed = new PlaceChange(place.modelPlace, place.modelPlace, undefined);
        changed.place.marking += 1;
        this.modelService.updatePlace(changed);
        this.historyService.save(`Token has been added to place ${place.id}.`);
    }
}
