import {
  DialogPlaceEditComponent,
  PlaceEditData,
} from '../../../../../dialogs/dialog-place-edit/dialog-place-edit.component';
import {PlaceChange} from '../../../../history-mode/model/place/place-change';
import {CanvasPlace} from '../../../domain/canvas-place';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class EditPlaceMenuItem extends MenuItem {

    constructor(
        place: CanvasPlace,
        tool: CanvasTool,
        translateService: TranslateService
    ) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.edit'),
            'edit',
            () => {
                tool.openDialog(DialogPlaceEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        placeId: place.modelPlace.id,
                        modelService: tool.modelService
                    } as PlaceEditData
                }, (editedPlace: PlaceChange) => {
                    tool.modelService.updatePlace(editedPlace);
                    if (editedPlace) {
                        tool.historyService.save(translateService.instant('builder.modeler.edit-mode.context-menu.place') + ` ${place.id} ` + translateService.instant('builder.modeler.edit-mode.context-menu.hasBeenChanged'));
                    }
                });
            }
        );
    }
}
