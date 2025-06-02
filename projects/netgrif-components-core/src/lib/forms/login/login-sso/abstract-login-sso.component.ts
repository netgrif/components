import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {LoggerService} from '../../../logger/services/logger.service';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {Sso} from "../../../../commons/schema";


@Component({
    selector: 'ncc-abstract-login-field',
    template: ''
})
export abstract class AbstractLoginSsoComponent implements OnDestroy {

    private _ssoConfig: Sso;
    protected loading: LoadingEmitter;

    protected constructor(
        protected _config: ConfigurationService,
        protected _http: HttpClient,
        protected _snackbar: SnackBarService,
        protected _log: LoggerService,
        protected _router: Router,
        protected _activeRouter: ActivatedRoute,
    ) {
        this._ssoConfig = this._config.getConfigurationSubtree(['providers', 'auth', 'sso']);
        this.loading = new LoadingEmitter();
        this._activeRouter.queryParams.subscribe((params) => {
            if (!!params.code) {
                this.loginFromCode(params);
            }
        });
    }

    ngOnDestroy(): void {
        this.loading.complete();
    }

    public loginFromCode(params: Params) {
        if (!params.code) {
            return;
        }

        this.loading.on();
        this._log.debug('Handling access token: ' + params.code)
        const refresh = this.getToken({
            grantType: 'authorization_code',
            code: params.code,
            redirectUri: location.origin + '/' + this._config.getConfigurationSubtree(['services', 'auth', 'loginRedirect']),
        });
        refresh.subscribe(
            it => {
                this.loading.off();
                if (it) {
                    this.redirectToHome();
                }
            },
        );
    }

    public redirectToSso(): void {
        let redirectUrl: string = this.getRedirectUrl();
        this._log.info("Redirecting to " + redirectUrl)
        window.location.href = redirectUrl;
    }

    private getRedirectUrl(): string {
        const myQuery = this._ssoConfig.redirectUrl + '?';
        const options: { [index: string]: string } = {
            client_id: this._ssoConfig.clientId,
            redirect_uri: location.origin + '/' + this._config.getConfigurationSubtree(['services', 'auth', 'toLoginRedirect']),
            response_type: 'code',
            scope: this._ssoConfig.scopes.join(' '),
        };
        return myQuery + Object.keys(options).map(
            key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
            },
        ).join('&');
    }

    private getToken(body: any): Observable<any> {
        // const url = this._authConfig.sso['refreshUrl'];
        // if (!url) {
        //     return throwError(new Error('Refresh URL is not defined in the config [nae.providers.auth.sso.refreshUrl]'));
        // }
        // return this._http.post(url, body,
        //     {headers: {'Content-Type': 'application/json'}}).pipe(
        //     catchError(error => {
        //         this.loading.off();
        //         this._snackbar.openErrorSnackBar('Pri pokuse o prihlásenie došlo k neočakávanej chybe.');
        //         if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 400)) {
        //             return throwError(error);
        //         } else {
        //             return throwError(error);
        //         }
        //     }),
        // );
        return of()
    }

    private redirectToHome() {
        this._router.navigate(['/portal']).then((value) => {
            this._log.debug('Routed to ' + value);
        });
    }

}
