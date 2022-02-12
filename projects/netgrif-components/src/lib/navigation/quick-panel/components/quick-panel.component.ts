import {Component} from '@angular/core';
import {AbstractQuickPanelComponent, LanguageService, PaperViewService} from '@netgrif/components-core';

@Component({
    selector: 'nc-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent extends AbstractQuickPanelComponent {
    constructor(protected _select: LanguageService, protected _paperView: PaperViewService) {
        super(_select, _paperView);
    }
}
