import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {BuilderMode} from "../../../../../builder-mode.service";

export class EditTransitionActionsMenuItem extends MenuItem {

    constructor(transition: CanvasTransition,
                tool: CanvasTool) {
        super(
            `Edit Actions (${tool.modelService.numberOfTransitionActions(transition.modelTransition)})`,
            'code',
            () => {
                tool.actionMode.activate(tool.actionMode.transitionActionsTool);
                tool.actionsMasterDetail.select(transition.modelTransition);
                tool.transitionService.id = transition.id;
                tool.builderModeService.mode = BuilderMode.ACTION_MODE;
            }
        );
    }
}
