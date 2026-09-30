import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {Tool} from '../../control-panel/tools/tool';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class FunctionsTool extends Tool {

    public static ID = 'functions';

    constructor(translateService: TranslateService) {
        super(
            FunctionsTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('functions'),
                translateService.instant('builder.modeler.actions-mode.tools.functions')
            ),
            ToolComponent
        );
    }

    public onClick(): void {
    }
}
