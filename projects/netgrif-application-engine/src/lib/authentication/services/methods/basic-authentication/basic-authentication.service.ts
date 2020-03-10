import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../../../models/user';
import {AuthenticationMethodService} from '../../authentication-method.service';
import Credentials from '../../../models/credentials';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {AuthenticationModule} from '../../../authentication.module';

@Injectable({
    providedIn: AuthenticationModule
})
export class BasicAuthenticationService extends AuthenticationMethodService {

    constructor(private _http: HttpClient, private _config: ConfigurationService) {
        super();
    }

    login(credentials: Credentials = {username: '', password: ''}): Observable<User> {
        const url = this._config.get().providers.auth.endpoints['login'];
        if (!url) {
            throwError(new Error('Login URL is not defined in the config [nae.providers.auth.endpoints.login]'));
        }
        if (!credentials.username || !credentials.password) {
            throwError(new Error('User\'s credentials are not defined!'));
        }
        credentials.username = credentials.username.trim();
        credentials.password = credentials.password.trim();
        if (credentials.username === '' || credentials.password === '') {
            throwError(new Error('User\'s credentials are empty!'));
        }

        return this._http.get<User>(url, {
            headers: new HttpHeaders().set('Authorization', `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`)
        });
    }

    logout(): Observable<object> {
        const url = this._config.get().providers.auth.endpoints['logout'];
        if (!url) {
            throw new Error('Logout URL is not defined in the config [nae.providers.auth.endpoints.logout]');
        }

        return this._http.post(url, {});
    }
}
