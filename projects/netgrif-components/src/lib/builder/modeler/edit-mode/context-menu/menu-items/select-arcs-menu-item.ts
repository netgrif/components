import {CanvasNodeElement} from '../../domain/canvas-node-element';
import {SelectTool} from '../../services/modes/select-tool';
import {MenuItem} from './menu-item';
import {TranslateService} from "@ngx-translate/core";

export class SelectArcsMenuItem extends MenuItem {

    constructor(tool: SelectTool, element: CanvasNodeElement<any, any>, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.selectConnectedArcs'),
            'sync_alt',
            () => {
                tool.selectConnectedArcs(element);
            }
        );
    }
}
