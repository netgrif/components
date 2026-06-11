import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {InhibitorArc as SvgInhibitorArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.setvice';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {EditModeService} from '../../edit-mode.service';
import {CreatePTArc} from './create-ptarc';
import {BuilderModeService} from "../../../../builder-mode.service";

export class CreateInhibitorArcTool extends CreatePTArc {

    public static ID = 'CreateInhibitorArcTool';

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
            CreateInhibitorArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('inhibitor', true),
                'Inhibitor Arc',
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
        return SvgInhibitorArc.ID;
    }

    arcType(): ArcType {
        return ArcType.INHIBITOR;
    }
}
