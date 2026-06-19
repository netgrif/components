import {Injectable, Injector} from '@angular/core';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ModeService} from '../control-panel/modes/mode-component/mode.service';
import {Tool} from '../control-panel/tools/tool';

@Injectable()
export class HistoryModeService extends ModeService<Tool> {

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector
    ) {
        super();
        this.mode = new Mode(
            'history',
            new ControlPanelButton(
                new ControlPanelIcon('history'),
                'History'
            ),
            './history',
            '/modeler/history',
            this._tutorialService.history,
            this._parentInjector
        );
        this.tools = [];
    }
}
