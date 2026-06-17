import {EventEmitter, Injectable, Injector} from "@angular/core";
import {ModeService} from "../control-panel/modes/mode-component/mode.service";
import {Tool} from "../control-panel/tools/tool";
import {TutorialService} from "../../tutorial/tutorial-service";
import {Mode} from "../control-panel/modes/mode";
import {ControlPanelButton} from "../control-panel/control-panel-button";
import {ControlPanelIcon} from "../control-panel/control-panel-icon";

@Injectable()
export class TaskModeService extends ModeService<Tool> {
    event: EventEmitter<void>;

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector
    ) {
        super();
        this.event = new EventEmitter();
        this.mode = new Mode(
            'task',
            new ControlPanelButton(
                new ControlPanelIcon('account_tree'),
                'Control Task view'
            ),
            './task',
            '',
            undefined,
            this._parentInjector
        );
        this.tools = [];
    }
}
