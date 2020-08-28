import {Component} from '@angular/core';
import {AbstractCasePanelComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent {
    constructor() {
        super();
    }
}
