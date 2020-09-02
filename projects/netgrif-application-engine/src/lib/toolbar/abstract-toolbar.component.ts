import {Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../translate/language.service';

export abstract class AbstractToolbarComponent implements OnInit {

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

    ngOnInit() {
    }

    setLang(lang: string): void {
        this.selectLangService.setLanguage(lang);
    }

    activeLang(lang: string): boolean {
        return this.translate.currentLang === lang;
    }
}
