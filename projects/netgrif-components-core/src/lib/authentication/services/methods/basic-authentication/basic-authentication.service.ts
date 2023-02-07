import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {Credentials} from '../../../models/credentials';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {UserResource} from '../../../../resources/interface/user-resource';
import * as Buffer from 'buffer';


@Injectable()
export class BasicAuthenticationService extends AuthenticationMethodService {

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
        return this._http.get<UserResource>(url, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' +
                this.encodeBase64(`${credentials.username}:${credentials.password}`))
        });
    }

    logout(): Observable<object> {
        const url = this._config.get().providers.auth.address + this._config.get().providers.auth.endpoints['logout'];
        if (!url) {
            return throwError(new Error('Logout URL is not defined in the config [nae.providers.auth.endpoints.logout]'));
        }

        return this._http.post(url, {});
    }

    encodeBase64(text: string): string {
        return Buffer.Buffer.from(text).toString('base64');
    }

    decodeBase64(encoded: string): string {
       return Buffer.Buffer.from(encoded, 'base64').toString('utf-8');
    }
}
