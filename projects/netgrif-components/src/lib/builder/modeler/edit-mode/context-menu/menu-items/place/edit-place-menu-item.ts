import {
  DialogPlaceEditComponent,
  PlaceEditData,
} from '../../../../../dialogs/dialog-place-edit/dialog-place-edit.component';
import {PlaceChange} from '../../../../history-mode/model/place/place-change';
import {CanvasPlace} from '../../../domain/canvas-place';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';

export class EditPlaceMenuItem extends MenuItem {

    constructor(
        place: CanvasPlace,
        tool: CanvasTool
    ) {
        super(
            'Edit',
            'edit',
            () => {
                tool.openDialog(DialogPlaceEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        placeId: place.modelPlace.id
                    } as PlaceEditData
                }, (editedPlace: PlaceChange) => {
                    tool.modelService.updatePlace(editedPlace);
                    if (editedPlace) {
                        tool.historyService.save(`Place ${place.id} has been changed.`);
                    }
                });
            }
        );
    }
}
