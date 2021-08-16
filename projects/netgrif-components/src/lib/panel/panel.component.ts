import {Component} from '@angular/core';
import {AbstractPanelComponent} from '@netgrif/application-engine';
import {CaseListFontColorService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends AbstractPanelComponent {
    constructor(caseListFontColorService: CaseListFontColorService) {
        super(caseListFontColorService);
    }
}
