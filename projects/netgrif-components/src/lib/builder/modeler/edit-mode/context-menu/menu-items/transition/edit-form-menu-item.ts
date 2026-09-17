import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {BuilderMode} from "../../../../../services/builder-mode.service";
import {TranslateService} from "@ngx-translate/core";

export class EditFormMenuItem extends MenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool, translateService: TranslateService) {
        super(
            transition.hasForm() ? translateService.instant('builder.modeler.edit-mode.context-menu.editForm') : translateService.instant('builder.modeler.edit-mode.context-menu.createNewForm'),
            'dashboard',
            () => {
                tool.transitionService.id = transition.id;
                tool.builderModeService.mode = BuilderMode.FORM_BUILDER;
            }
        );
    }
}
