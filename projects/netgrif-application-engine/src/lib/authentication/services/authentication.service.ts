import Credentials from '../models/credentials';
import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from './authentication-method.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _authenticated$: BehaviorSubject<boolean>;

    constructor(private _auth: AuthenticationMethodService, private _config: ConfigurationService) {

    }

    login(credentials: Credentials): Observable<User> {
        return of({username: ''});
    }

    logout(): void {

    }

    isAuthenticated(): boolean {
        return this._authenticated$.getValue();
    }

    get authenticated$(): BehaviorSubject<boolean> {
        return this._authenticated$;
    }
}
