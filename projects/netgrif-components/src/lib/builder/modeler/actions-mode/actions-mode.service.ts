import {Injectable, Injector} from '@angular/core';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ModeService} from '../control-panel/modes/mode-component/mode.service';
import {Tool} from '../control-panel/tools/tool';
import {ToolGroup} from '../control-panel/tools/tool-group';
import {DataActionsTool} from './tools/data-actions-tool';
import {FunctionsTool} from './tools/functions-tool';
import {ProcessActionsTool} from './tools/process-actions-tool';
import {RoleActionsTool} from './tools/role-actions-tool';
import {TransitionActionsTool} from './tools/transition-actions-tool';

@Injectable()
export class ActionsModeService extends ModeService<Tool> {

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector,
        private _dataActionsTool: DataActionsTool,
        private _transitionActionsTool: TransitionActionsTool,
        private _roleActionsTool: RoleActionsTool,
        private _processActionsTool: ProcessActionsTool,
        private _functionsTool: FunctionsTool
    ) {
        super();
        this.mode = new Mode(
            'actions',
            new ControlPanelButton(
                new ControlPanelIcon('code'),
                'Actions Edit view'
            ),
            './actions',
            '/modeler/actions',
            this._tutorialService.actions,
            this._parentInjector
        );
        this.tools = [
            new ToolGroup<Tool>(_dataActionsTool, _transitionActionsTool, _roleActionsTool, _processActionsTool, _functionsTool)
        ];
    }

    get transitionActionsTool(): TransitionActionsTool {
        return this._transitionActionsTool;
    }

    get roleActionsTool(): TransitionActionsTool {
        return this._roleActionsTool;
    }

    get dataActionsTool(): TransitionActionsTool {
        return this._dataActionsTool;
    }
}
