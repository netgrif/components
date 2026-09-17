import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class ProcessActionsTool extends Tool {

    public static ID = 'process';

    constructor(translateService: TranslateService) {
        super(
            ProcessActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('device_hub'),
                translateService.instant('builder.modeler.actions-mode.tools.processAndCase')
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
