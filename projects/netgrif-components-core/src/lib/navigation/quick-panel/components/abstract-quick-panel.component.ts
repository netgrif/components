import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {PaperViewService} from './paper-view.service';
import {AbstractNavigationResizableDrawerComponent} from '../../navigation-drawer/abstract-navigation-resizable-drawer.component';

export type QuickPanelItem = 'language' | 'settings' | 'logout' | 'impersonation';

@Component({
    selector: 'ncc-abstract-quick-panel',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractQuickPanelComponent extends AbstractNavigationResizableDrawerComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(protected _select: LanguageService, protected _paperView: PaperViewService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    setPaperView() {
        this._paperView.paperView = !this._paperView.paperView;
    }

    isPaperView() {
        return this._paperView.paperView;
    }
}
