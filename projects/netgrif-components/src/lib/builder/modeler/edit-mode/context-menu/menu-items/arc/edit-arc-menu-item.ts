import {ChangedArc} from '../../../../../dialogs/dialog-arc-edit/changed-arc';
import {ArcEditData, DialogArcEditComponent} from '../../../../../dialogs/dialog-arc-edit/dialog-arc-edit.component';
import {CanvasArc} from '../../../domain/canvas-arc';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';

export class EditArcMenuItem extends MenuItem {

    constructor(arc: CanvasArc, tool: CanvasTool) {
        super(
            'Edit',
            'edit',
            () => {
                tool.openDialog(DialogArcEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        arcId: arc.modelArc.id
                    } as ArcEditData
                }, (editedArc: ChangedArc) => {
                    tool.modelService.updateArc(editedArc);
                    if (editedArc) {
                        tool.historyService.save(`Arc ${arc.id} has been changed.`);
                    }
                });
            }
        );
    }
}
