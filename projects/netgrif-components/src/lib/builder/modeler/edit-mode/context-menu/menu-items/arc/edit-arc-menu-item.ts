import {ChangedArc} from '../../../../../dialogs/dialog-arc-edit/changed-arc';
import {ArcEditData, DialogArcEditComponent} from '../../../../../dialogs/dialog-arc-edit/dialog-arc-edit.component';
import {CanvasArc} from '../../../domain/canvas-arc';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class EditArcMenuItem extends MenuItem {

    constructor(arc: CanvasArc, tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.edit'),
            'edit',
            () => {
                tool.openDialog(DialogArcEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        context: tool.context,
                        arcId: arc.modelArc.id
                    } as ArcEditData
                }, (editedArc: ChangedArc) => {
                    tool.modelService.updateArc(editedArc);
                    if (editedArc) {
                        tool.historyService.save(translateService.instant('builder.modeler.edit-mode.context-menu.arc') + ` ${arc.id} ` + translateService.instant('builder.modeler.edit-mode.context-menu.hasBeenChanged'));
                    }
                });
            }
        );
    }
}
