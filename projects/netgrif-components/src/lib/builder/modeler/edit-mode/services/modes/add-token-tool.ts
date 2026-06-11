import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.setvice';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {PlaceChange} from '../../../history-mode/model/place/place-change';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {CanvasPlace} from '../../domain/canvas-place';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {BuilderModeService} from "../../../../builder-mode.service";

export class AddTokenTool extends CanvasTool {

    public static readonly ID = 'AddTokenTool';

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        editModeService: EditModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        actionMode: ActionsModeService,
        actionsMasterDetail: ActionsMasterDetailService,
        builderModeService: BuilderModeService,
    ) {
        super(
            AddTokenTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('add_circle_outline', false, true),
                'Add token',
            ),
            modelService,
            dialog,
            editModeService,
            router,
            transitionService,
            actionMode,
            actionsMasterDetail,
            builderModeService,
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
