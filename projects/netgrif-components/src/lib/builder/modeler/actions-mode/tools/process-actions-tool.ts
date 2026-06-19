import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

@Injectable()
export class ProcessActionsTool extends Tool {

    public static ID = 'process';

    constructor() {
        super(
            ProcessActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('device_hub'),
                'Process & Case'
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
