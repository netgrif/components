import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ReadArc as SvgReadArc} from '@netgrif/petri.svg';
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

export class CreateReadArcTool extends CreatePTArc {

    public static ID = 'CreateReadArcTool';

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
            CreateReadArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('read', true),
                'Read Arc',
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
        return SvgReadArc.ID;
    }

    arcType(): ArcType {
        return ArcType.READ;
    }
}
