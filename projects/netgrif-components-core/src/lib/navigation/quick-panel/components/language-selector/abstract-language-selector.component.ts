import {Component} from '@angular/core';
import {LanguageService} from '../../../../translate/language.service';
import {LanguageIconsService} from '../../../../data-fields/i18n-field/language-icons.service';
import {SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'ncc-abstract-language-selector',
    template: ''
})
export abstract class AbstractLanguageSelectorComponent {

    protected constructor(protected _langService: LanguageService,
                          protected _languageIconsService: LanguageIconsService) {
    }

    public getLangKeys() {
        return this._langService.getTranslations().map(trans => trans.key);
    }

    public getCurrentLang() {
        return this._langService.getLanguage();
    }

    public setLang(lang: string) {
        this._langService.setLanguage(lang, true);
    }

    public getLanguageIcons() {
        return this._languageIconsService.languageIcons;
    }

    public getLangIcon(lang: string): SafeHtml {
        return this._languageIconsService.languageIcons[lang].svgIcon;
    }
}
