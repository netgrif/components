import {ChangedTransition} from '../../../../../dialogs/dialog-transition-edit/changed-transition';
import {
  DialogTransitionEditComponent,
  TransitionEditData,
} from '../../../../../dialogs/dialog-transition-edit/dialog-transition-edit.component';
import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class EditTransitionMenuItem extends MenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.editTask'),
            'edit',
            () => {
                tool.openDialog(DialogTransitionEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        transitionId: transition.id,
                        context: tool.context
                    } as TransitionEditData
                }, (editedTransition: ChangedTransition) => {
                    tool.modelService.updateTransition(editedTransition);
                    tool.bindKeys();
                    if (editedTransition) {
                        tool.historyService.save(translateService.instant('builder.modeler.edit-mode.context-menu.task') + ` ${transition.id} ` + translateService.instant('builder.modeler.edit-mode.context-menu.hasBeenChanged'));
                    }
                });
            }
        );
    }
}
