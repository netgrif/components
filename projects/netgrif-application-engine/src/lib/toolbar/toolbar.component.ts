import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SelectLanguageService} from './select-language.service';

@Component({
    selector: 'nae-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input()
    public loggedUser: string;

    @Input()
    public appName: string;

    @Input()
    public logoSrc: string;

    @Input()
    public logoAlt: string;

    constructor(private translate: TranslateService, private selectLangService: SelectLanguageService) {
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
