import {EventEmitter, Injectable, Injector} from '@angular/core';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ModeService} from '../control-panel/modes/mode-component/mode.service';
import {Tool} from '../control-panel/tools/tool';

@Injectable()
export class RoleModeService extends ModeService<Tool> {
    event: EventEmitter<void>;

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector
    ) {
        super();
        this.mode = new Mode(
            'roles',
            new ControlPanelButton(
                new ControlPanelIcon('group_add'),
                'Role Edit view'
            ),
            './roles',
            '/modeler/roles',
            this._tutorialService.roleEditor,
            this._parentInjector
        );
        this.tools = [];
        this.event = new EventEmitter();
    }
}
