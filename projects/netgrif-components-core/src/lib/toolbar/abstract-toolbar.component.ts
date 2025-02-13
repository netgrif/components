import {Component, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../translate/language.service';
import {ToolbarConfig} from './toolbar-config';
import {UserService} from '../user/services/user.service';
import {Router} from '@angular/router';
import {User} from '../user/models/user';
import {RedirectService} from '../routing/redirect-service/redirect.service';

@Component({
    selector: 'ncc-abstract-toolbar',
    template: ''
})
export abstract class AbstractToolbarComponent {

    @Input()
    public toolbarConfig: ToolbarConfig = {
        profileEnabled: false,
        languageEnabled: false,
        logoutEnabled: false,
        simpleToolbar: true,
        toolbarName: {
            defaultValue: 'Netgrif',
            translations: {}
        },
        toolbarLogo: 'assets/img/netgrif_full_white.svg',
        profileUrl: 'profile',
        loginUrl: ''
    };

    constructor(protected translate: TranslateService, protected selectLangService: LanguageService,
                protected userService: UserService, protected router: Router, protected redirectService: RedirectService) {
    }

    setLang(lang: string): void {
        this.selectLangService.setLanguage(lang);
    }

    activeLang(lang: string): boolean {
        return this.translate.currentLang === lang;
    }

    public logout(): void {
        this.userService.logout().subscribe(() => {
            if (!!this.toolbarConfig.loginUrl && this.toolbarConfig.loginUrl !== "") {
                this.router.navigate([this.toolbarConfig.loginUrl]);
            } else {
                this.router.navigate([this.redirectService.resolveLoginPath()]);
            }
        });
    }

    public profile(): void {
        this.router.navigate([this.toolbarConfig.profileUrl]);
    }

    public get loggedUser(): User {
        return this.userService.user;
    }

    public isImpersonating(): boolean {
        return this.loggedUser.isImpersonating();
    }

    public getToolbarTitle(): string {
        return this.selectLangService.getLanguage() in this.toolbarConfig.toolbarName.translations
            ? this.toolbarConfig.toolbarName.translations[this.selectLangService.getLanguage()]
            : this.toolbarConfig.toolbarName.defaultValue;
    }
}
