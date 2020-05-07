import {Injectable} from '@angular/core';
import en from '../../assets/i18n/en.json';
import sk from '../../assets/i18n/sk.json';
import de from '../../assets/i18n/de.json';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private _langChange$: Subject<string>;

    constructor(private _translate: TranslateService) {
        _translate.addLangs(['en-US', 'sk-SK', 'de-DE']);
        _translate.setTranslation('en-US', en, true);
        _translate.setTranslation('sk-SK', sk, true);
        _translate.setTranslation('de-DE', de, true);
        _translate.setDefaultLang('en-US');
        this._langChange$ = new Subject<string>();

        const lang = localStorage.getItem('Language');
        if (lang === null) {
            const browserLang = _translate.getBrowserLang();
            _translate.use(browserLang.match(/en-US|sk-SK|de-DE/) ? browserLang : 'en-US');
            localStorage.setItem('Language', browserLang.match(/en-US|sk-SK|de-DE/) ? browserLang : 'en-US');
        } else {
            _translate.use(lang.match(/en-US|sk-SK|de-DE/) ? lang : 'en-US');
            localStorage.setItem('Language', lang.match(/en-US|sk-SK|de-DE/) ? lang : 'en-US');
        }

        _translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            console.log('Language changed to ' + event.lang);
        });
    }

    setLanguage(lang: string) {
        this._translate.use(lang.match(/en-US|sk-SK|de-DE/) ? lang : 'en-US');
        localStorage.setItem('Language', lang.match(/en-US|sk-SK|de-DE/) ? lang : 'en-US');
        this._langChange$.next(lang.match(/en-US|sk-SK|de-DE/) ? lang : 'en-US');
    }

    getLanguage() {
        return this._translate.currentLang;
    }

    getLangChange$(): Observable<string> {
        return this._langChange$.asObservable();
    }
}
