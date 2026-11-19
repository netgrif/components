import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ControlPanelService} from './control-panel.service';
import {GlobalToolRegistry} from './tools/global-tool-registry';
import {BuilderModeService} from '../../services/builder-mode.service';

@Component({
    selector: 'nc-builder-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ControlPanelComponent {

    constructor(
        public globalToolRegistry: GlobalToolRegistry,
        public controlPanelService: ControlPanelService,
        public builderModeService: BuilderModeService,
    ) {
    }

    protected getRegistryItems() {
        return this.controlPanelService.modeRegistry.getItems();
    }
}
