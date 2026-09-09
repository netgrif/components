import {ConfigurationService} from '../configuration/configuration.service';
import {NullAuthenticationService} from './services/methods/null-authentication/null-authentication.service';
import {BasicAuthenticationService} from './services/methods/basic-authentication/basic-authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BasicWithRealmAuthenticationService} from "./services/methods/basic-authentication/basic-with-realm-authentication.service";
import {filter, take} from "rxjs/operators";
import {UserResource} from "../resources/interface/user-resource";
import {Credentials} from "./models/credentials";
import {Observable, throwError} from 'rxjs';
import {Injectable} from "@angular/core";
import {AuthenticationMethodService} from "./services/authentication-method.service";

@Injectable()
export class ProxyAuthenticationService extends AuthenticationMethodService {

    private _proxyAuthMethod: AuthenticationMethodService = new NullAuthenticationService();

    constructor(private _config: ConfigurationService, private _http: HttpClient) {
        super();
        this._config.loaded$
            .pipe(
                filter(loaded => !!loaded),
                take(1)
            )
            .subscribe(() => {
                const snapshot = this._config.snapshot;
                const auth = snapshot?.providers?.auth;

                if (!auth || !auth.authentication) {
                    this._proxyAuthMethod = new NullAuthenticationService();
                    return;
                }

                const authType = auth.authentication.toLowerCase();
                if (authType === 'basic') {
                    this._proxyAuthMethod = new BasicAuthenticationService(this._http, this._config);
                } else if (authType === 'basicwithrealm') {
                    this._proxyAuthMethod = new BasicWithRealmAuthenticationService(this._http, this._config);
                } else {
                    this._proxyAuthMethod = new NullAuthenticationService();
                }
            });
    }

    login(credentials: Credentials): Observable<UserResource> {
        return this._proxyAuthMethod.login(credentials);
    }

    loginWithApiToken(token: string, realmId?: string): Observable<UserResource> {
        const auth = this._config.get().providers.auth;
        const loginEndpoint = typeof auth.endpoints === 'object' ? auth.endpoints['login'] : undefined;
        const url = auth.address + (loginEndpoint ?? '');
        if (!loginEndpoint) {
            return throwError(new Error('Login URL is not defined in the config [nae.providers.auth.endpoints.login]'));
        }
        if (!token?.trim()) {
            return throwError(new Error('API token is empty'));
        }

        let headers = new HttpHeaders().set('Authorization', `Bearer ${token.trim()}`);
        if (realmId?.trim()) {
            headers = headers.set('X-Realm-ID', realmId.trim());
        }
        return this._http.get<UserResource>(url, {headers});
    }

    logout(): Observable<object> {
        return this._proxyAuthMethod.logout();
    }
}
