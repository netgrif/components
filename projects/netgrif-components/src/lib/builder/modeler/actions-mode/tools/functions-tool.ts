import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

@Injectable()
export class FunctionsTool extends Tool {

    public static ID = 'functions';

    constructor() {
        super(
            FunctionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('functions'),
                'Functions'
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
