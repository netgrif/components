import {Component, Input, OnInit} from '@angular/core';
import {SelectLanguageService} from '../../../../toolbar/select-language.service';

@Component({
    selector: 'nae-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

    @Input() public language: string;

    /**
     * ISO 639-1
     */
    public langMenuItems = [
        {
            key: 'sk-SK',
            value: 'sk'
        },
        {
            key: 'en-US',
            value: 'en'
        }];

    constructor(private _select: SelectLanguageService) {
    }

    ngOnInit(): void {
    }

    get flagCountryCode(): string {
        return this.flagCode(this.language);
    }

    flagCode(languageCode: string): string {
        if (languageCode.includes('-')) {
            return languageCode.split('-')[1].toLowerCase();
        }
        return languageCode.toLowerCase();
    }

    setLang(lang: string) {
        this.language = lang;
        this._select.setLanguage(lang);
    }
}
