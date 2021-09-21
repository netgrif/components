import {Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../translate/language.service';

export abstract class AbstractLanguageSelectorComponent implements OnInit {

    @Input() public language: string;

    protected _flagOverrides: Map<string, string>;

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
            value: 'en',
            flag: 'gb'
        }];

    protected constructor(protected _select: LanguageService) {
        this._flagOverrides = new Map<string, string>();
        this.langMenuItems.forEach(option => {
            if (option.flag !== undefined) {
                this._flagOverrides.set(option.key, option.flag);
            }
        });
    }

    ngOnInit(): void {
    }

    get flagCountryCode(): string {
        return this.flagCode(this.language);
    }

    flagCode(languageCode: string): string {
        if (this._flagOverrides.has(languageCode)) {
            return this._flagOverrides.get(languageCode) as string;
        }
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
