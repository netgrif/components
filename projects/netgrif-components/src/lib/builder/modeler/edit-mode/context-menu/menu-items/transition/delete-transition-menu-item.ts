import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {DeleteMenuItem} from '../delete-menu-item';

export class DeleteTransitionMenuItem extends DeleteMenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool) {
        super(() => {
            tool.deleteTransition(transition);
        });
    }
}
