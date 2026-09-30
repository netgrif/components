import {CanvasArc} from '../../../domain/canvas-arc';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {MenuItem} from '../menu-item';
import {TranslateService} from "@ngx-translate/core";

export class DeleteBreakpointMenuItem extends MenuItem {

    constructor(arc: CanvasArc, breakPointIndex: number, tool: CanvasTool, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.deleteBreakpoint'),
            'clear',
            () => {
                tool.editModeService.removeBreakpoint(arc, breakPointIndex);
            }
        );
    }
}
