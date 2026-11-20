import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TransitionActionsTool extends Tool {

    public static ID = 'transition';

    constructor(translateService: TranslateService) {
        super(
            TransitionActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('auto_awesome_motion', false, true),
                translateService.instant('builder.modeler.actions-mode.tools.transitions')
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
