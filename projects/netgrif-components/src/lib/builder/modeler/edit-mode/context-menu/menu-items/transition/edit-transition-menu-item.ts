import {ChangedTransition} from '../../../../../dialogs/dialog-transition-edit/changed-transition';
import {
  DialogTransitionEditComponent,
  TransitionEditData,
} from '../../../../../dialogs/dialog-transition-edit/dialog-transition-edit.component';
import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';

export class EditTransitionMenuItem extends MenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool) {
        super(
            'Edit Task',
            'edit',
            () => {
                tool.openDialog(DialogTransitionEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        transitionId: transition.id
                    } as TransitionEditData
                }, (editedTransition: ChangedTransition) => {
                    tool.modelService.updateTransition(editedTransition);
                    tool.bindKeys();
                    if (editedTransition) {
                        tool.historyService.save(`Task ${transition.id} has been changed.`);
                    }
                });
            }
        );
    }
}
