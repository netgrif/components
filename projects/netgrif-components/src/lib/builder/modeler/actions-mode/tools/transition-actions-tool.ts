import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

@Injectable()
export class TransitionActionsTool extends Tool {

    public static ID = 'transition';

    constructor() {
        super(
            TransitionActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('auto_awesome_motion', false, true),
                'Transitions'
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
