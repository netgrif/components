import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import sk from '../assets/i18n/sk.json';
import en from '../assets/i18n/en.json';
import 'hammerjs';
import {LanguageService, RoutingBuilderService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(private _languageService: LanguageService, private _naeRouting: RoutingBuilderService,
                public routes: Router, private translate: TranslateService) {
        translate.setTranslation('en-US', en, true);
        translate.setTranslation('sk-SK', sk, true);
    }
}
