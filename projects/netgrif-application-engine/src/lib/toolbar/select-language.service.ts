import {Injectable} from '@angular/core';
import en from '../../assets/i18n/en.json';
import sk from '../../assets/i18n/sk.json';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SelectLanguageService {

    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'sk']);
        translate.setTranslation('en', en, true);
        translate.setTranslation('sk', sk, true);
        translate.setDefaultLang('en');

        const lang = localStorage.getItem('Language');
        if (lang === null) {
            const browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|sk/) ? browserLang : 'en');
            localStorage.setItem('Language', browserLang.match(/en|sk/) ? browserLang : 'en');
        } else {
            translate.use(lang.match(/en|sk/) ? lang : 'en');
            localStorage.setItem('Language', lang.match(/en|sk/) ? lang : 'en');
        }

        translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            console.log('Language changed to ' + event.lang);
        });
    }

    setLanguage(lang: string) {
        this.translate.use(lang.match(/en|sk/) ? lang : 'en');
        localStorage.setItem('Language', lang.match(/en|sk/) ? lang : 'en');
    }
}
