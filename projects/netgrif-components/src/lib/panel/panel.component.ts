import {Component} from '@angular/core';
import {AbstractPanelComponent} from '@netgrif/components-core';
import {CaseListFontColorService} from '@netgrif/components-core';

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
