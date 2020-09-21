import {Component, Inject} from '@angular/core';
import {AbstractOptionSelectorComponent, NAE_SIDE_MENU_CONTROL, SideMenuControl} from '@netgrif/application-engine';

@Component({
    selector: 'nc-option-selector',
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.scss']
})
export class OptionSelectorComponent extends AbstractOptionSelectorComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
