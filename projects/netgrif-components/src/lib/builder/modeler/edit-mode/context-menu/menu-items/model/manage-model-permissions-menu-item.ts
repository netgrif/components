import {DataType} from '@netgrif/petriflow';
import {
  DialogManageRolesComponent,
  RoleRefType,
} from '../../../../../dialogs/dialog-manage-roles/dialog-manage-roles.component';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class ManageModelPermissionsMenuItem extends MenuItem {

    constructor(tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.managePermissions'),
            'people',
            () => {
                tool.openDialog(DialogManageRolesComponent, {
                    width: '60%',
                    panelClass: "dialog-width-60",
                    data: {
                        type: RoleRefType.PROCESS,
                        roles: tool.model.getRoles(),
                        processRolesRefs: tool.model.getRoleRefs(),
                        processUserRefs: tool.model.getUserRefs(),
                        userLists: tool.model.getDataSet().filter(item => item.type === DataType.USER_LIST),
                        modelService: tool.modelService,
                        historyService: tool.editModeService.historyService,
                        localStorageService: tool.context.localStorageService
                    }
                });
            }
        );
    }
}
