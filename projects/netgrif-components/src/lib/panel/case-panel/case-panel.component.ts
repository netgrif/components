import {Component} from '@angular/core';
import {AbstractCasePanelComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
