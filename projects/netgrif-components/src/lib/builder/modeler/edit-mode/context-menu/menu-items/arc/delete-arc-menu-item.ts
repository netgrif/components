import {CanvasArc} from '../../../domain/canvas-arc';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {DeleteMenuItem} from '../delete-menu-item';
import {TranslateService} from "@ngx-translate/core";

export class DeleteArcMenuItem extends DeleteMenuItem {

    constructor(arc: CanvasArc, tool: CanvasTool, translateService: TranslateService) {
        super(() => {
            tool.deleteArc(arc);
        }, translateService);
    }
}
