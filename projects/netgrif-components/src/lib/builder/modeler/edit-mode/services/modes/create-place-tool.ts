import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {BuilderModeService} from "../../../../builder-mode.service";

export class CreatePlaceTool extends CanvasTool {

    public static ID = 'CreatePlaceTool';

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
            CreatePlaceTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('circle', false, true),
                'Place',
            ),
            modelService,
            dialog,
            editModeService,
            router,
            transitionService,
            actionMode,
            actionsMasterDetail,
            builderModeService
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
