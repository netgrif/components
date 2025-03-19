import { Injectable } from '@angular/core';
import {ConfigurationService} from "../../../../configuration/configuration.service";
import {AuthenticationMethodService} from "../../authentication-method.service";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {UserResource} from "../../../../resources/interface/user-resource";
import {Credentials} from "../../../models/credentials";

@Injectable()
export class BasicWithRealmAuthenticationService extends AuthenticationMethodService {

    constructor(private _http: HttpClient, private _config: ConfigurationService) {
        super();
    }

    login(credentials: Credentials = {username: '', password: ''}): Observable<UserResource> {
        const url = this._config.get().providers.auth.address + this._config.get().providers.auth.endpoints['login'];
        if (!url) {
            return throwError(new Error('Login URL is not defined in the config [nae.providers.auth.endpoints.login]'));
        }
        if (!credentials.username || !credentials.password) {
            return throwError(new Error('User\'s credentials are not defined!'));
        }
        credentials.username = credentials.username.trim();
        credentials.password = credentials.password.trim();
        if (credentials.username === '' || credentials.password === '') {
            return throwError(new Error('User\'s credentials are empty!'));
        }
        console.log("TOTOOOTOTOTOOK!!!")
        return this._http.post<UserResource>(url, credentials);
    }

    logout(): Observable<object> {
        const url = this._config.get().providers.auth.address + this._config.get().providers.auth.endpoints['logout'];
        if (!url) {
            return throwError(new Error('Logout URL is not defined in the config [nae.providers.auth.endpoints.logout]'));
        }
        return this._http.post(url, {});
    }

}
