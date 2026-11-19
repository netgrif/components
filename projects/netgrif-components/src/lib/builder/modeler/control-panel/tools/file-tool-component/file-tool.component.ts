import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {NAB_CONTROL_PANEL_TOOL} from '../../control-panel-tool-injection-token';
import {Tool} from '../tool';

@Component({
    selector: 'nc-builder-file-tool',
    templateUrl: './file-tool.component.html',
    styleUrls: ['./file-tool.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FileToolComponent {

    constructor(@Inject(NAB_CONTROL_PANEL_TOOL) public fileTool: Tool) {
    }
}
