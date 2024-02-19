import {Injectable, OnDestroy} from '@angular/core';
import en from '../../assets/i18n/en.json';
import sk from '../../assets/i18n/sk.json';
import de from '../../assets/i18n/de.json';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {UserPreferenceService} from '../user/services/user-preference.service';
import {LoggerService} from '../logger/services/logger.service';

export interface Translation {
    key: string,
    translation: any
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService implements OnDestroy {

    protected _translations: Array<Translation>;
    protected _langChange$: Subject<string>;
    protected subPreference: Subscription;
    protected subTranslate: Subscription;
    protected _defaultLanguage: string = 'en';

    constructor(protected _translate: TranslateService,
                protected _preferenceService: UserPreferenceService,
                protected _logger: LoggerService) {
        this._translations = [
            { key: 'en', translation: en },
            { key: 'sk', translation: sk },
            { key: 'de', translation: de }
        ];
        this._translate.addLangs(this._translations.map(trans => trans.key));
        this._translations.forEach(trans => {
            this._translate.setTranslation(trans.key, trans.translation, true);
        })
        this._translate.setDefaultLang(this._defaultLanguage);
        this._langChange$ = new Subject<string>();

        this.checkLocalStorage();

        setTimeout(() => {
            if (this._preferenceService) {
                this.subPreference = this._preferenceService.preferencesChanged$.subscribe(() => {
                    const preferredLang = this._preferenceService.getLocale();
                    if (preferredLang !== undefined && preferredLang !== this._translate.currentLang) {
                        this.setLanguage(preferredLang);
                    }
                });
            }
        });


        this.subTranslate = _translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            this._logger.debug('Language changed to ' + event.lang);
        });
    }

    ngOnDestroy(): void {
        this.subTranslate.unsubscribe();
        if (this.subPreference) {
            this.subPreference.unsubscribe();
        }
    }

    protected checkLocalStorage() {
        const lang = localStorage.getItem('Language');
        if (lang === null) {
            const browserLang = this._translate.getBrowserLang();
            this.setLanguage(browserLang);
        } else {
            this.setLanguage(lang);
        }
    }

    public setDefaultLang(lang: string) {
        if (this.checkIfLangExists(lang)) {
            this._defaultLanguage = lang;
        } else {
            this._logger.error(lang + " Language doesn't exists!");
        }
    }

    public setLanguage(lang: string, saveToPreferences = false) {
        this._translate.use( this.checkIfLangExists(lang) ? lang : this._defaultLanguage);
        if (saveToPreferences) {
            this._preferenceService.setLocale(lang);
        }
        localStorage.setItem('Language', this.checkIfLangExists(lang) ? lang : this._defaultLanguage);
        this._langChange$.next(this.checkIfLangExists(lang) ? lang : this._defaultLanguage);
    }

    public addLanguage(lang: string, translation: Object) {
        this._translate.addLangs([lang]);
        this._translate.setTranslation(lang, translation, true);
        this._translations.push({key: lang, translation})
    }

    public removeLanguage(lang: string) {
        const index = this._translations.findIndex(value => value.key === lang);
        if (index !== -1) {
            if (this._translate.currentLang === lang && this._translate.currentLang !== this._defaultLanguage) {
                this.setLanguage(this._defaultLanguage);
            }
            this._translations.splice(index, 1);
        }
    }

    public getTranslations(): Array<Translation> {
        return this._translations;
    }

    getLanguage() {
        return this._translate.currentLang;
    }

    public getLangChange$(): Observable<string> {
        return this._langChange$.asObservable();
    }

    protected checkIfLangExists(lang: string): boolean {
        return this._translations.some(value => value.key === lang);
    }


}
