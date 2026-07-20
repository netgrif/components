import {Injectable} from '@angular/core';
import {Locale} from '../classes/locale';

@Injectable()
export class LanguageSelectService {
    private _locale: Locale;
    constructor() {

    }

    get locale(): Locale {
        return this._locale;
    }

    set locale(value: Locale) {
        this._locale = value;
    }
}
