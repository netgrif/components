import {SelectTool} from '../../services/modes/select-tool';
import {MenuItem} from './menu-item';
import {TranslateService} from "@ngx-translate/core";

export class DeleteSelectedMenuItem extends MenuItem {

    constructor(selectTool: SelectTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.delete') + `${selectTool.selectedElements.totalSize() > 1 ? ' ' + translateService.instant('builder.modeler.edit-mode.context-menu.all') : ''}`,
            'delete',
            () => {
                selectTool.deleteSelected();
            }
        );
    }
}
