import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {BuilderMode} from "../../../../../services/builder-mode.service";

export class EditFormMenuItem extends MenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool) {
        super(
            transition.hasForm() ? 'Edit form' : 'Create new form',
            'dashboard',
            () => {
                tool.transitionService.id = transition.id;
                tool.builderModeService.mode = BuilderMode.FORM_BUILDER;
            }
        );
    }
}
