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

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|sk/) ? browserLang : 'en');

        translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            console.log('Language changed to ' + event.lang);
        });
    }
}
