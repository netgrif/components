import {Injectable, OnInit} from '@angular/core';
import en from '../../assets/i18n/en.json';
import sk from '../../assets/i18n/sk.json';
import de from '../../assets/i18n/de.json';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {Observable, Subject} from 'rxjs';
import {UserPreferenceService} from '../user/services/user-preference.service';
import {LoggerService} from '../logger/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private _langChange$: Subject<string>;

    private readonly _LANG_MATCHER = /en-US|sk-SK|de-DE/;
    private readonly _DEFAULT_LANG = 'en-US';

    constructor(private _translate: TranslateService,
                private _preferenceService: UserPreferenceService,
                private _logger: LoggerService) {
        this._translate.addLangs(['en-US', 'sk-SK', 'de-DE']);
        this._translate.setTranslation('en-US', en, true);
        this._translate.setTranslation('sk-SK', sk, true);
        this._translate.setTranslation('de-DE', de, true);
        this._translate.setDefaultLang(this._DEFAULT_LANG);
        this._langChange$ = new Subject<string>();

        const lang = localStorage.getItem('Language');
        if (lang === null) {
            const browserLang = _translate.getBrowserLang();
            this.setLanguage(browserLang);
        } else {
            this.setLanguage(lang);
        }

        this._translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            this._logger.debug('Language changed to ' + event.lang);
        });

        setTimeout(() => {
            this._preferenceService.preferencesChanged$().subscribe(() => {
                const preferredLang = this._preferenceService.getLocale();
                if (preferredLang !== undefined && preferredLang !== this._translate.currentLang) {
                    this.setLanguage(preferredLang);
                }
            });
        });
    }

    setLanguage(lang: string, saveToPreferences = false) {
        this._translate.use(lang.match(this._LANG_MATCHER) ? lang : this._DEFAULT_LANG);
        // if (saveToPreferences) {
        //     this._preferenceService.setLocale(lang);
        // }
        localStorage.setItem('Language', lang.match(this._LANG_MATCHER) ? lang : this._DEFAULT_LANG);
        this._langChange$.next(lang.match(this._LANG_MATCHER) ? lang : this._DEFAULT_LANG);
    }

    getLanguage() {
        return this._translate.currentLang;
    }

    getLangChange$(): Observable<string> {
        return this._langChange$.asObservable();
    }
}
