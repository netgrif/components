import {CanvasNodeElement} from '../../domain/canvas-node-element';
import {SelectTool} from '../../services/modes/select-tool';
import {MenuItem} from './menu-item';

export class SelectArcsMenuItem extends MenuItem {

    constructor(tool: SelectTool, element: CanvasNodeElement<any, any>) {
        super(
            `Select connected arcs`,
            'sync_alt',
            () => {
                tool.selectConnectedArcs(element);
            }
        );
    }
}
