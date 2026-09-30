import {DataType} from '@netgrif/petriflow';
import {
  DialogManageRolesComponent,
  RoleRefType,
} from '../../../../../dialogs/dialog-manage-roles/dialog-manage-roles.component';
import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class EditTransitionPermissionsMenuItem extends MenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.permissions') + ` (${tool.modelService.numberOfTransitionPermissions(transition.modelTransition)})`,
            'people',
            () => {
                tool.openDialog(DialogManageRolesComponent, {
                    width: '60%',
                    panelClass: "dialog-width-60",
                    data: {
                        type: RoleRefType.TRANSITION,
                        roles: tool.modelService.model.getRoles(),
                        rolesRefs: transition.modelTransition.roleRefs,
                        userRefs: transition.modelTransition.userRefs,
                        userLists: tool.modelService.model.getDataSet().filter(item => item.type === DataType.USER_LIST),
                        modelService: tool.modelService,
                        historyService: tool.editModeService.historyService,
                        localStorageService: tool.context.localStorageService
                    }
                });
            }
        );
    }
}
