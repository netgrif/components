import {Component, Input, OnInit} from '@angular/core';
import {SelectLanguageService} from './select-language.service';
import {TranslateService} from '@ngx-translate/core';
import sk from '../../assets/i18n/sk.json';
import en from '../../assets/i18n/en.json';

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

    constructor(public selectLanguageService: SelectLanguageService, public translate: TranslateService) {
        translate.setTranslation('en', en);
        translate.setTranslation('sk', sk);
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit() {
    }

}
