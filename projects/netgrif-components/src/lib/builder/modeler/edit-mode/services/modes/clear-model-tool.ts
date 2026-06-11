import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogDeleteModelComponent} from '../../../../dialogs/dialog-delete-model/dialog-delete-model.component';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.setvice';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {EditModeService} from '../../edit-mode.service';
import {CanvasTool} from './canvas-tool';
import {BuilderModeService} from "../../../../builder-mode.service";

export class ClearModelTool extends CanvasTool {

    public static readonly ID = 'ClearModelTool'

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
            ClearModelTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('delete_forever', false, true),
                'Delete model',
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

    onClick(): void {
        super.onClick();
        const dialogRef = this.dialog.open(DialogDeleteModelComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const oldId = this.modelService.model.id;
                this.modelService.model = this.modelService.newModel();
                this.historyService.save(`Model ${oldId} has been deleted.`);
            }
        });
    }
}
