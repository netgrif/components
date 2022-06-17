import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import sk from '../assets/i18n/sk.json';
import en from '../assets/i18n/en.json';
import 'hammerjs';
import {
    LanguageService,
    RoutingBuilderService,
    BaseAllowedNetsService,
    AllowedNetsServiceFactory,
    UserService
} from '@netgrif/components-core';
import {filter, take} from 'rxjs/operators';

@Component({
    selector: 'nae-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(private _languageService: LanguageService, private _naeRouting: RoutingBuilderService,
                public routes: Router, private translate: TranslateService,
                private baseAllowedNets: BaseAllowedNetsService, private allowedNetsFactory: AllowedNetsServiceFactory,
                private userService: UserService) {
        translate.setTranslation('en-US', en, true);
        translate.setTranslation('sk-SK', sk, true);

        this.userService.user$.pipe(filter(u => !!u && u.id !== ''), take(1)).subscribe(() => {
            const allNets = allowedNetsFactory.createWithAllNets();
            allNets.allowedNetsIdentifiers$.pipe(take(1)).subscribe(nets => {
                if (this.baseAllowedNets.allowedNets.length !== 0) {
                    return;
                }
                this.baseAllowedNets.allowedNets = nets;
                allNets.ngOnDestroy();
            });
        });
    }

    isDoubleDrawer() {
        return !!this.routes.url.match(/^\/drawer-double|/);
    }
}
