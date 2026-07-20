import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

@Injectable()
export class RoleActionsTool extends Tool {

    public static ID = 'role';

    constructor() {
        super(
            RoleActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('person', false, true),
                'Roles'
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
