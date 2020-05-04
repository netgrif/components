import {Component, Input, OnInit} from '@angular/core';
import {SelectLanguageService} from '../../../toolbar/select-language.service';

export type QuickPanelItem = 'language' | 'settings' | 'logout';

@Component({
    selector: 'nae-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor(private _select: SelectLanguageService) {
    }

    ngOnInit(): void {
    }

    getLang(): string {
        return this._select.getLanguage();
    }
}
