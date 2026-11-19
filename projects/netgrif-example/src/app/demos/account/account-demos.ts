import {ChangeDetectionStrategy, Component, SkipSelf} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Credentials, UserService} from '@netgrif/components-core';
import {OFFLINE_ENGINE_ADDRESS} from '../../playground/offline/playground-configuration.service';
import {CodeSnippet} from '../../playground/code-block/code-block.component';

/** a form of the account pages and what the demo shows around it */
interface AccountForm {
    id: 'login' | 'registration' | 'recovery' | 'change-password';
    title: string;
    description: string;
    api: Array<string>;
}

const FORMS: Array<AccountForm> = [
    {
        id: 'login', title: 'Login',
        description: 'Login form of the application: user name and password, links to the registration and to the password recovery.',
        api: ['nc-login-form', 'LoginFormComponentModule', 'UserService.login'],
    },
    {
        id: 'registration', title: 'Registration',
        description: 'Registration from the link of an invitation e-mail: the token of the link is verified, the user fills in '
            + 'the name and the password.',
        api: ['nc-registration-form', 'RegistrationFormComponentModule', 'SignUpService', 'NAE_MIN_PASSWORD_LENGTH'],
    },
    {
        id: 'recovery', title: 'Password recovery',
        description: 'Forgotten password in two steps: the e-mail form sends a link, the form of the link sets a new password.',
        api: ['nc-email-submission-form', 'nc-forgotten-password-form', 'SignUpService.resetPassword', 'SignUpService.recoverPassword'],
    },
    {
        id: 'change-password', title: 'Change password',
        description: 'Change of the password of the logged user (current password and the new one twice).',
        api: ['nc-change-password-form', 'ChangePasswordFormComponentModule', 'ProfileService.changePassword'],
    },
];

/**
 * `UserService` of the login form of the demo: the credentials go to the mock engine (`auth/login`, fails with the password
 * "wrong") and the playground user stays logged in (the global `UserService` / `AuthenticationService` are not touched).
 */
export function accountDemoUserServiceFactory(http: HttpClient, userService: UserService): UserService {
    // the user service of the application with another login (the change password form reads the logged user)
    const service = Object.create(userService) as UserService;
    service.login = (credentials: Credentials) => http.post<any>(`${OFFLINE_ENGINE_ADDRESS}auth/login`, {}, {
        headers: new HttpHeaders({Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`}),
    });
    return service;
}

/**
 * The account forms (`forms/` of the library) on a page like the login page of an application. The mock engine answers
 * them: the login fails with the password "wrong", the links have the token "valid-token", the current password is "password".
 */
@Component({
    selector: 'ne-account-demo',
    templateUrl: './account-demo.component.html',
    styleUrls: ['./account-demo.component.scss'],
    providers: [{provide: UserService, useFactory: accountDemoUserServiceFactory, deps: [HttpClient, [new SkipSelf(), UserService]]}],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class AccountDemoComponent {
    readonly form$: Observable<AccountForm>;

    // login
    showSignUpButton = true;
    showForgottenPasswordButton = true;
    // registration / recovery
    token = 'valid-token';
    displayLegalNotice = true;
    /** recovery: the e-mail step or the step of the link */
    recoveryStep: 'email' | 'link' = 'email';

    /** outputs of the form, newest first */
    events: Array<{ name: string, value: string }> = [];
    renderKey = 0;
    /** Material 3 density of the form (`ne-density-*` classes of the playground styles) */
    density = 0;
    readonly densities = [0, -1, -2, -3, -4, -5];

    constructor(route: ActivatedRoute) {
        this.form$ = route.paramMap.pipe(map(params => {
            this.events = [];
            return FORMS.find(f => f.id === params.get('form')) ?? FORMS[0];
        }));
    }

    log(name: string, value?: any): void {
        let text = '';
        if (value !== undefined) {
            try {
                text = JSON.stringify(value, (key, v) => (/password/i.test(key) && v ? '••••' : v));
            } catch {
                text = String(value);
            }
        }
        this.events = [{name, value: text}, ...this.events].slice(0, 8);
    }

    rerender(): void {
        this.renderKey++;
    }

    snippets(form: AccountForm): Array<CodeSnippet> {
        switch (form.id) {
            case 'login':
                return [{
                    label: 'HTML',
                    code: `<!-- LoginFormComponentModule -->
<nc-login-form [showSignUpButton]="${this.showSignUpButton}"
               [showForgottenPasswordButton]="${this.showForgottenPasswordButton}"
               (login)="onLogin($event)"
               (signUp)="router.navigate(['/sign-up'])"
               (resetPassword)="router.navigate(['/forgotten-password'])"></nc-login-form>`,
                }, {
                    label: 'nae.json',
                    code: `"providers": {"auth": {"endpoints": {"login": "auth/login", "logout": "auth/logout"}}}`,
                }];
            case 'registration':
                return [{
                    label: 'HTML',
                    code: `<!-- RegistrationFormComponentModule; the token is the last segment of the link of the invitation e-mail -->
<nc-registration-form [token]="token" [displayLegalNotice]="${this.displayLegalNotice}"
                      (register)="onRegister($event)"
                      (invalidToken)="onInvalidToken()"></nc-registration-form>`,
                }, {
                    label: 'TypeScript',
                    code: `providers: [{provide: NAE_MIN_PASSWORD_LENGTH, useValue: 8}]   // optional, default 8`,
                }, {
                    label: 'nae.json',
                    code: `"providers": {"auth": {"endpoints": {"signup": "auth/signup", "verify": "auth/token/verify"}}}`,
                }];
            case 'recovery':
                return [{
                    label: 'HTML',
                    code: `<!-- step 1: EmailSubmissionFormComponentModule, the application sends the e-mail -->
<nc-email-submission-form (formSubmit)="signUpService.resetPassword($event.email).subscribe()"
                          (goBackButton)="router.navigate(['/login'])"></nc-email-submission-form>

<!-- step 2: ForgottenPasswordFormComponentModule, opened from the link of the e-mail -->
<nc-forgotten-password-form [token]="token" (register)="onPasswordSet($event)"></nc-forgotten-password-form>`,
                }, {
                    label: 'nae.json',
                    code: `"providers": {"auth": {"endpoints": {"reset": "auth/reset", "recover": "auth/recover", "verify": "auth/token/verify"}}}`,
                }];
            default:
                return [{
                    label: 'HTML',
                    code: `<!-- ChangePasswordFormComponentModule -->
<nc-change-password-form (changePassword)="onChanged($event)"></nc-change-password-form>`,
                }, {
                    label: 'nae.json',
                    code: `"providers": {"auth": {"endpoints": {"changePassword": "auth/changePassword"}}}`,
                }];
        }
    }
}
