import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SelectLanguageService {

    public languages = {
        'slovak': false,
        'english': true
    };

    constructor() {
    }

    public changeLanguage(language: string) {
        Object.keys(this.languages).forEach((key) => {
            key === language ? this.languages[key] = true : this.languages[key] = false;
        });
    }
}
