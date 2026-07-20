import {
  DialogPlaceRefDeleteComponent,
  PlaceRefDeleteData,
} from '../../../../../dialogs/dialog-place-ref-delete/dialog-place-ref-delete.component';
import {CanvasPlace} from '../../../domain/canvas-place';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {DeleteMenuItem} from '../delete-menu-item';

export class DeletePlaceMenuItem extends DeleteMenuItem {

    constructor(canvasPlace: CanvasPlace, tool: CanvasTool) {
        super(() => {
                const referenced = tool.model.getArcs().filter(a => a.reference === canvasPlace.id);
                if (referenced.length === 0) {
                    tool.deletePlace(canvasPlace);
                    return;
                }
                tool.dialog.open(DialogPlaceRefDeleteComponent, {
                    data: {
                        place: canvasPlace,
                        arcs: referenced
                    } as PlaceRefDeleteData
                }).afterClosed().subscribe(value => {
                    if (value === true) {
                        tool.deletePlace(canvasPlace);
                    }
                });

            }
        );
    }
}
