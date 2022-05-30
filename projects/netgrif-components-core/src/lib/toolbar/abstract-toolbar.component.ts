import {Component, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../translate/language.service';

@Component({
    selector: 'ncc-abstract-toolbar',
    template: ''
})
export abstract class AbstractToolbarComponent {

    @Input()
    public loggedUser: string;

    @Input()
    public appName: string;

    @Input()
    public logoSrc: string;

    @Input()
    public logoAlt: string;

    constructor(protected translate: TranslateService, protected selectLangService: LanguageService) {
    }

    setLang(lang: string): void {
        this.selectLangService.setLanguage(lang);
    }

    activeLang(lang: string): boolean {
        return this.translate.currentLang === lang;
    }
}
