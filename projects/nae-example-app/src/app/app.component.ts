import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import sk from '../assets/i18n/sk.json';
import en from '../assets/i18n/en.json';
import 'hammerjs';

@Component({
    selector: 'nae-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(public routes: Router, private translate: TranslateService) {
        translate.setTranslation('en', en, true);
        translate.setTranslation('sk', sk, true);
    }
}
