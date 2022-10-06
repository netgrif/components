import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {PaperViewService} from './paper-view.service';
import {AbstractNavigationResizableDrawerComponent} from '../../navigation-drawer/abstract-navigation-resizable-drawer.component';

export type QuickPanelItem = 'language' | 'settings' | 'logout' | 'impersonation';

@Component({
    selector: 'ncc-abstract-quick-panel',
    template: ''
})
export abstract class AbstractQuickPanelComponent extends AbstractNavigationResizableDrawerComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(protected _select: LanguageService, protected _paperView: PaperViewService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    getLang(): string {
        return this._select.getLanguage();
    }

    setPaperView() {
        this._paperView.paperView = !this._paperView.paperView;
    }

    isPaperView() {
        return this._paperView.paperView;
    }
}
