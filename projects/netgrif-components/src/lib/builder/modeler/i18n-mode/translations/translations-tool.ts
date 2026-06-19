import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable} from '@angular/core';
import {ControlPanelButton} from '../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../control-panel/control-panel-icon';
import {I18nTool} from '../classes/i18n-tool';
import {TranslationsComponent} from './translations.component';
import {ToolComponent} from "../../control-panel/tools/tool-component/tool.component";

@Injectable()
export class TranslationsTool extends I18nTool {

    constructor() {
        super(
            'translations',
            new ComponentPortal(TranslationsComponent),
            new ControlPanelButton(
                new ControlPanelIcon('translate'),
                'Translations'
            ),
            ToolComponent
        );
    }
}
