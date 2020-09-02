import {Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../translate/language.service';

export abstract class AbstractLanguageSelectorComponent implements OnInit {

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
            key: 'de-DE',
            value: 'de'
        },
        {
            key: 'en-US',
            value: 'en'
        }];

    constructor(protected _select: LanguageService) {
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
        this._select.setLanguage(lang, true);
    }
}
