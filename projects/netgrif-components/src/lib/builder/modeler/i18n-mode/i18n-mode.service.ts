import {Injectable, Injector} from '@angular/core';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ModeService} from '../control-panel/modes/mode-component/mode.service';
import {Tool} from '../control-panel/tools/tool';
import {ToolGroup} from '../control-panel/tools/tool-group';
import {LanguagesTool} from './languages/languages-tool';
import {TranslationsTool} from './translations/translations-tool';

@Injectable()
export class I18nModeService extends ModeService<Tool> {

    constructor(
        private tutorialService: TutorialService,
        private parentInjector: Injector,
        private _translationsTool: TranslationsTool,
        private _languagesTool: LanguagesTool
    ) {
        super();
        this.mode = new Mode(
            'i18n',
            new ControlPanelButton(
                new ControlPanelIcon('translate'),
                'Internationalization view'
            ),
            './i18n',
            '/modeler/i18n',
            this.tutorialService.i18n,
            this.parentInjector
        );
        this.tools = [
            new ToolGroup<Tool>(_languagesTool, _translationsTool)
        ];
    }

    get translationsTool() {
        return this._translationsTool;
    }
}
