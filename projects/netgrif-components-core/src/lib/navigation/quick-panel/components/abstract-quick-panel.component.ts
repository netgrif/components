import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {
    AbstractNavigationResizableDrawerComponent
} from '../../navigation-drawer/abstract-navigation-resizable-drawer.component';

export type QuickPanelItem = 'language' | 'settings' | 'logout' | 'impersonation';

@Component({
    selector: 'ncc-abstract-quick-panel',
    template: ''
})
export abstract class AbstractQuickPanelComponent extends AbstractNavigationResizableDrawerComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(protected _select: LanguageService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}
