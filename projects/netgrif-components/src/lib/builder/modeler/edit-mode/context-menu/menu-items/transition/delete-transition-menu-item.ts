import {CanvasTransition} from '../../../domain/canvas-transition';
import {CanvasTool} from '../../../services/modes/canvas-tool';
import {DeleteMenuItem} from '../delete-menu-item';
import {TranslateService} from "@ngx-translate/core";

export class DeleteTransitionMenuItem extends DeleteMenuItem {

    constructor(transition: CanvasTransition, tool: CanvasTool, translateService: TranslateService) {
        super(() => {
            tool.deleteTransition(transition);
        }, translateService);
    }
}
