import {Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../translate/language.service';
import {PaperViewService} from './paper-view.service';
import {BehaviorSubject} from 'rxjs';

export type QuickPanelItem = 'language' | 'settings' | 'logout';

export abstract class AbstractQuickPanelComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;
    @Input() public contentWidth: BehaviorSubject<number>;
    public width: number;

    constructor(protected _select: LanguageService, protected _paperView: PaperViewService) {
    }

    ngOnInit(): void {
        if (!!this.contentWidth) {
            this.contentWidth.subscribe(newWidth => this.width = newWidth);
        }
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
