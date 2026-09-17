import {EventEmitter, Injectable, Injector} from "@angular/core";
import {ModeService} from "../control-panel/modes/mode-component/mode.service";
import {Tool} from "../control-panel/tools/tool";
import {TutorialService} from "../../tutorial/tutorial-service";
import {Mode} from "../control-panel/modes/mode";
import {ControlPanelButton} from "../control-panel/control-panel-button";
import {ControlPanelIcon} from "../control-panel/control-panel-icon";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TaskModeService extends ModeService<Tool> {
    event: EventEmitter<void>;

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector,
        translateService: TranslateService
    ) {
        super();
        this.event = new EventEmitter();
        this.mode = new Mode(
            'task',
            new ControlPanelButton(
                new ControlPanelIcon('account_tree'),
                translateService.instant('builder.modeler.task-mode.controlTaskView')
            ),
            './task',
            '',
            undefined,
            this._parentInjector
        );
        this.tools = [];
    }
}
