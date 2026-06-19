import {CanvasArc} from '../../../domain/canvas-arc';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';

export class DeleteBreakpointMenuItem extends MenuItem {

    constructor(arc: CanvasArc, breakPointIndex: number, tool: CanvasTool) {
        super(
            'Delete breakpoint',
            'clear',
            () => {
                tool.editModeService.removeBreakpoint(arc, breakPointIndex);
            }
        );
    }
}
