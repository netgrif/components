import {Component, Input} from '@angular/core';
import {TutorialService} from '../../../../tutorial/tutorial-service';
import {ControlPanelService} from '../../control-panel.service';
import {Mode} from '../mode';

@Component({
    selector: 'nc-builder-control-panel-mode',
    templateUrl: './mode.component.html',
    styleUrls: ['./mode.component.scss']
})
export class ModeComponent {

    @Input() mode: Mode;

    constructor(
        private _tutorialService: TutorialService,
        private _controlPanelService: ControlPanelService,
    ) {
    }

    setActive() {
        this._controlPanelService.activate(this.mode);
    }

    isActive() {
        return this._controlPanelService.isActive(this.mode.id);
    }

    get tutorialService(): TutorialService {
        return this._tutorialService;
    }

    isOutlined() {
        return this.mode.icon.isOutlined;
    }
}
