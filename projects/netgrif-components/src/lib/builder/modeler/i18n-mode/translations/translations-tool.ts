import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {I18nTool} from '../classes/i18n-tool';
import {TranslationsComponent} from './translations.component';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TranslationsTool extends I18nTool {

    constructor(translateService: TranslateService) {
        super(
            'translations',
            new ComponentPortal(TranslationsComponent),
            new ControlPanelButton(
                new ControlPanelIcon('translate'),
                translateService.instant('builder.modeler.i18n-mode.translations')
            ),
            ToolComponent
        );
    }
}
