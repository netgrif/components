import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class DataActionsTool extends Tool {

    public static ID = 'data';

    constructor(translateService: TranslateService) {
        super(
            DataActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('all_inbox', false, true),
                translateService.instant('builder.modeler.actions-mode.tools.dataVariables')
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
