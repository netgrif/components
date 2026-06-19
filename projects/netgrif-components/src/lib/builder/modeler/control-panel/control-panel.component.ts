import {Component} from '@angular/core';
import {ControlPanelService} from './control-panel.service';
import {GlobalToolRegistry} from './tools/global-tool-registry';

@Component({
    selector: 'nc-builder-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

    constructor(
        public globalToolRegistry: GlobalToolRegistry,
        public controlPanelService: ControlPanelService,
    ) {
    }

    protected getRegistryItems() {
        return this.controlPanelService.modeRegistry.getItems();
    }
}
