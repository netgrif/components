import {Component, Inject} from '@angular/core';
import {NAB_CONTROL_PANEL_TOOL} from '../../control-panel-tool-injection-token';
import {Tool} from '../tool';

@Component({
    selector: 'nc-builder-file-tool',
    templateUrl: './file-tool.component.html',
    styleUrls: ['./file-tool.component.scss']
})
export class FileToolComponent {

    constructor(@Inject(NAB_CONTROL_PANEL_TOOL) public fileTool: Tool) {
    }
}
