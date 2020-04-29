import {Injectable} from '@angular/core';
import en from '../../assets/i18n/en.json';
import sk from '../../assets/i18n/sk.json';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SelectLanguageService {

    constructor(private translate: TranslateService) {
        translate.addLangs(['en-US', 'sk-SK']);
        translate.setTranslation('en-US', en, true);
        translate.setTranslation('sk-SK', sk, true);
        translate.setDefaultLang('en-US');

        const lang = localStorage.getItem('Language');
        if (lang === null) {
            const browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en-US|sk-SK/) ? browserLang : 'en-US');
            localStorage.setItem('Language', browserLang.match(/en-US|sk-SK/) ? browserLang : 'en-US');
        } else {
            translate.use(lang.match(/en-US|sk-SK/) ? lang : 'en-US');
            localStorage.setItem('Language', lang.match(/en-US|sk-SK/) ? lang : 'en-US');
        }

        translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            console.log('Language changed to ' + event.lang);
        });
    }

    setLanguage(lang: string) {
        this.translate.use(lang.match(/en-US|sk-SK/) ? lang : 'en-US');
        localStorage.setItem('Language', lang.match(/en-US|sk-SK/) ? lang : 'en-US');
    }

    getLanguage() {
        return this.translate.currentLang;
    }
}
