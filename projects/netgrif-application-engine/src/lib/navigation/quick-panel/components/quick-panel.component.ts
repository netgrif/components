import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {PaperViewService} from './paper-view.service';

export type QuickPanelItem = 'language' | 'settings' | 'logout';

@Component({
    selector: 'nae-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(private _select: LanguageService, private _paperView: PaperViewService) {
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
