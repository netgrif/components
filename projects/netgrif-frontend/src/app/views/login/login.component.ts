import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
    FormSubmitEvent,
    LanguageService,
    LoggerService,
    MessageResource,
    NAE_VIEW_ID_SEGMENT,
    SignUpService,
    SnackBarService,
    User,
    UserService,
    ViewIdService
} from '@netgrif/components-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * The page of the account forms, chosen by the route of the view (nae.json):
 * - `login`: the login form with the links to the sign up and to the forgotten password,
 * - `sign-up`: the e-mail of the new user, the engine sends the invitation link (`signup/:token`),
 * - `signup/:token`: the registration form (name, surname, password) of the invitation link,
 * - `forgotten-password`: the e-mail of the account, the engine sends the recovery link (`recover/:token`),
 * - `recover/:token`: the new password of the recovery link.
 */
export type AccountPage = 'login' | 'sign-up' | 'registration' | 'forgotten-password' | 'recovery';

const PAGES: { [path: string]: AccountPage } = {
    'sign-up': 'sign-up',
    'signup/:token': 'registration',
    'forgotten-password': 'forgotten-password',
    'recover/:token': 'recovery'
};

const TITLES: { [page in AccountPage]: [string, string] } = {
    'login': ['forms.login.title', 'forms.login.subtitle'],
    'sign-up': ['forms.signUp.title', 'forms.signUp.subtitle'],
    'registration': ['forms.register.title', 'forms.register.subtitle'],
    'forgotten-password': ['forms.forgottenPass.title', 'forms.forgottenPass.subtitle'],
    'recovery': ['forms.forgottenPass.recoverTitle', 'forms.forgottenPass.recoverSubtitle']
};

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'login'
        },
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginComponent implements OnInit {
    public readonly page: AccountPage;
    /** the token of the link of the e-mail (registration, recovery) */
    public readonly token: string | null;
    /** the e-mail of the sign up / forgotten password has been sent */
    public mailSent = false;

    constructor(
        private router: Router,
        route: ActivatedRoute,
        private _userService: UserService,
        private _signUpService: SignUpService,
        private _snackbar: SnackBarService,
        private _translate: TranslateService,
        private _log: LoggerService,
        private _languageService: LanguageService
    ) {
        this.page = PAGES[route.snapshot.routeConfig?.path ?? ''] ?? 'login';
        this.token = route.snapshot.paramMap.get('token');
    }

    public get title(): string {
        return TITLES[this.page][0];
    }

    public get subtitle(): string {
        return TITLES[this.page][1];
    }

    public languages(): Array<string> {
        return this._languageService.getTranslations().map(translation => translation.key);
    }

    public currentLanguage(): string {
        return this._languageService.getLanguage();
    }

    public setLanguage(lang: string): void {
        this._languageService.setLanguage(lang, true);
    }

    ngOnInit(): void {
        if (this.page === 'login' && this._userService.user.id.length !== 0) {
            this.redirectToHome();
        }
    }

    onLogin(user: User) {
        if (user && user.id) {
            this.redirectToHome();
        } else {
            this._snackbar.openErrorSnackBar(
                this._translate.instant('forms.login.wrongCredentials')
            );
        }
    }

    public toLogin(): void {
        this.router.navigate(['/login']);
    }

    public navigate(path: string): void {
        this.router.navigate(['/' + path]);
    }

    /** the e-mail of the sign up (invitation) or of the forgotten password (recovery link) */
    public onEmailSubmit(event: FormSubmitEvent): void {
        const request: Observable<MessageResource> = this.page === 'sign-up'
            ? this._signUpService.invite({email: event['email'], groups: [], processRoles: []})
            : this._signUpService.resetPassword(event['email']);
        event['loading']?.on();
        request.pipe(take(1)).subscribe(() => {
            event['loading']?.off();
            this.mailSent = true;
        }, error => {
            event['loading']?.off();
            this._log.error('Sending the e-mail failed', error);
            this._snackbar.openErrorSnackBar(this._translate.instant('forms.submitFailed'));
        });
    }

    /** the registration or the new password is saved (the form shows the errors itself) */
    public onPasswordSet(message: MessageResource): void {
        if (message?.success) {
            this._snackbar.openSuccessSnackBar(this._translate.instant(
                this.page === 'registration' ? 'forms.register.done' : 'forms.forgottenPass.done'));
            this.toLogin();
        }
    }

    private redirectToHome() {
        this.router.navigate(['/cases']).then(() => {
            this._log.debug('Routed to cases');
        });
    }
}
