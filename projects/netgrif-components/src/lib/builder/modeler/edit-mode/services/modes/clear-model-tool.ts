import {DialogDeleteModelComponent} from '../../../../dialogs/dialog-delete-model/dialog-delete-model.component';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CanvasTool} from './canvas-tool';
import {CanvasToolContext} from './canvas-tool-context';

export class ClearModelTool extends CanvasTool {

    public static readonly ID = 'ClearModelTool'

    constructor(context: CanvasToolContext) {
        super(
            ClearModelTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('delete_forever', false, true),
                context.translateService.instant('builder.modeler.edit-mode.services.deleteModel'),
            ),
            context,
        );
    }

    onClick(): void {
        super.onClick();
        const dialogRef = this.dialog.open(DialogDeleteModelComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const oldId = this.modelService.model.id;
                this.modelService.model = this.modelService.newModel();
                this.historyService.save(this._translateService.instant('builder.modeler.edit-mode.services.model') + ` ${oldId} ` + this._translateService.instant('builder.modeler.edit-mode.services.hasBeenDeleted'));
            }
        });
    }
}
