import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {Credentials} from '../../../models/credentials';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UserResource} from '../../../../resources/interface/user-resource';
import {Auth} from '../../../../../commons/schema';

@Injectable()
export class BasicAuthenticationService extends AuthenticationMethodService {

    constructor(private _http: HttpClient, private _config: ConfigurationService) {
        super();
    }

    login(credentials: Credentials = {username: '', password: ''}): Observable<UserResource> {
        const endpoints = this._config.get().providers.auth.endpoints;
        if (endpoints === undefined) {
            return throwError(new Error('Endpoints are not defined in the config [nae.providers.auth.endpoints]'));
        }
        const endpoint = endpoints['login'];
        if (endpoint === undefined) {
            return throwError(new Error('Login URL is not defined in the config [nae.providers.auth.endpoints.login]'));
        }
        const url = this._config.get().providers.auth.address + endpoint;
        if (!credentials.username || !credentials.password) {
            throwError(new Error('User\'s credentials are not defined!'));
        }
        credentials.username = credentials.username.trim();
        credentials.password = credentials.password.trim();
        if (credentials.username === '' || credentials.password === '') {
            throwError(new Error('User\'s credentials are empty!'));
        }

        return this._http.get<UserResource>(url, {
            headers: new HttpHeaders().set('Authorization', `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`)
        });
    }

    logout(): Observable<object> {

        const endpoints = this._config.get().providers.auth.endpoints;
        if (endpoints === undefined) {
            return throwError(new Error('Endpoints are not defined in the config [nae.providers.auth.endpoints]'));
        }
        const endpoint = endpoints['logout'];
        if (endpoint === undefined) {
            return throwError(new Error('Logout URL is not defined in the config [nae.providers.auth.endpoints.logout]'));
        }
        const url = this._config.get().providers.auth.address + endpoint;
        return this._http.post(url, {});
    }
}
