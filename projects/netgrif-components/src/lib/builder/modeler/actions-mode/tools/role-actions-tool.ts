import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class RoleActionsTool extends Tool {

    public static ID = 'role';

    constructor(translateService: TranslateService) {
        super(
            RoleActionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('person', false, true),
                translateService.instant('builder.modeler.actions-mode.tools.roles')
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
