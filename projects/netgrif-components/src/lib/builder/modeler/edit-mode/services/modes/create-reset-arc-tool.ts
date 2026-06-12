import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ResetArc as SvgResetArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {EditModeService} from '../../edit-mode.service';
import {CreatePTArc} from './create-ptarc';
import {BuilderModeService} from "../../../../builder-mode.service";

export class CreateResetArcTool extends CreatePTArc {

    public static ID = 'CreateResetArcTool';

    constructor(
        modelService: ModelService,
        dialog: MatDialog,
        editModeService: EditModeService,
        router: Router,
        transitionService: SelectedTransitionService,
        actionMode: ActionsModeService,
        actionsMasterDetail: ActionsMasterDetailService,
        builderModeService: BuilderModeService
    ) {
        super(
            CreateResetArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('resetarc', true),
                'Reset Arc',
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

    getMarkerId(): string {
        return SvgResetArc.ID;
    }

    arcType(): ArcType {
        return ArcType.RESET;
    }
}
