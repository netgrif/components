import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HistoryService} from '../../services/history/history.service';
import {Locale} from '../classes/locale';
import {Locales} from '../classes/locales';
import {LanguageSelectService} from './language-select.service';
import {I18nControlService} from "../i18n-control.service";
import {I18nModeService} from "../i18n-mode.service";
import {LanguageIconsService} from "@netgrif/components-core";

@Component({
    selector: 'nc-builder-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

    historySave: boolean;
    newLocaleFormControl = new FormControl<Locale>(undefined, {
        validators: [this.autocompleteStringValidator(), Validators.required]
    });
    filteredLocales: Observable<Array<Locale>>;
    localeList: Locale[] = [];

    constructor(protected i18nControlService: I18nControlService,
                protected i18nModeService: I18nModeService,
                protected _historyService: HistoryService,
                protected _languageSelect: LanguageSelectService,
                protected _languageIconsService: LanguageIconsService) {
        this.localeList = Object.keys(this._languageIconsService.languageIcons)
            .filter(key => key !== 'xx' && key !== undefined)
            .map(key => {
            const lang = this._languageIconsService.languageIcons[key];
            const locale = Locales.list.find(l => l.languageCode === key);
            return new Locale(key, lang.languageName, key, locale?.country ?? key, locale?.countryCode ?? key);
        });
    }

    ngOnInit(): void {
        this.filteredLocales = this.newLocaleFormControl.valueChanges.pipe(
            startWith(''),
            map(name => this._filter(name)),
        );
    }

    ngOnDestroy() {
        if (this.historySave) {
            this._historyService.save("Translations has been changed.");
        }
    }

    invalidLocale(): boolean {
        return this.newLocaleFormControl.invalid;
    }

    displayFn(locale: Locale): string {
        return locale ? locale.prettyName : '';
    }

    private _filter(name: any): Array<Locale> {
        if (!name) {
            return this.unusedLocales();
        }
        if (name instanceof Locale) {
            return [name];
        }
        return this.unusedLocales().filter(option => option.prettyName.toLowerCase().includes(name.toLowerCase()));
    }

    autocompleteStringValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (this.unusedLocales()?.indexOf(control.value) !== -1) {
                return null;
            }
            return {invalidAutocompleteString: {value: control.value}};
        };
    }

    unusedLocales(): Array<Locale> {
        return this.localeList?.filter(l => !this.i18nControlService?.locales?.includes(l)) ?? [];
    }

    usedLocales(): Array<Locale> {
        return this.i18nControlService?.locales.sort((a, b) => {
            if (a.prettyName < b.prettyName) {
                return -1;
            }
            if (a.prettyName > b.prettyName) {
                return 1;
            }
            return 0;
        });
    }

    addLocal() {
        this.i18nControlService.addLocale(this.newLocaleFormControl.value.languageCode);
        this.newLocaleFormControl.reset();
        this.historySave = true;
    }

    deleteLocale() {
        this.historySave = true;
    }

    selectLocale(locale) {
        this._languageSelect.locale = locale;
        this.i18nModeService.activate(this.i18nModeService.translationsTool);
    }
}
