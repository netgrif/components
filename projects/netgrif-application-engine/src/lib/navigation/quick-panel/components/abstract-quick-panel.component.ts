import {Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {PaperViewService} from './paper-view.service';

export type QuickPanelItem = 'language' | 'settings' | 'logout';

export abstract class AbstractQuickPanelComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(protected _select: LanguageService, protected _paperView: PaperViewService) {
    }

    ngOnInit(): void {
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
