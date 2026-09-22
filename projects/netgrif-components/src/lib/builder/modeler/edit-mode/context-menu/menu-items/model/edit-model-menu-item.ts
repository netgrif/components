import {DialogModelEditComponent} from '../../../../../dialogs/dialog-model-edit/dialog-model-edit.component';
import {ModelChange} from '../../../../history-mode/model/model/model-change';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class EditModelMenuItem extends MenuItem {

    constructor(tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.editModel'),
            'edit',
            () => {
                tool.openDialog(DialogModelEditComponent, {
                    width: '50%',
                    panelClass: "dialog-width-50",
                    data: {
                        model: new ModelChange(tool.model, tool.model.clone()),
                        context: tool.context
                    }
                }, (changedModel: {model: ModelChange}) => {
                    if (changedModel?.model != undefined) {
                        tool.modelService.updateModel(changedModel?.model);
                        if (changedModel?.model) {
                            tool.historyService.save(translateService.instant('builder.modeler.edit-mode.context-menu.modelHasBeenChanged'));
                            tool.context.builderIntegrationService.setModelData(tool.modelService.model);
                        }
                    }
                });
            }
        );
    }
}
