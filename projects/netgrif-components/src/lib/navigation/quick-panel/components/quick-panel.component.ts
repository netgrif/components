import {Component} from '@angular/core';
import {AbstractQuickPanelComponent, LanguageService} from '@netgrif/components-core';

@Component({
    selector: 'nc-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    standalone: false
})
export class QuickPanelComponent extends AbstractQuickPanelComponent {
    constructor(protected _select: LanguageService) {
        super(_select);
    }
}
