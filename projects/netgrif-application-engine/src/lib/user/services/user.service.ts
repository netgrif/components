import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import Role from '../models/role';
import {User} from '../models/user';
import {Credentials} from '../../authentication/models/credentials';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserPreferenceService} from './user-preference.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: User;
    private _loginCalled: boolean;

    constructor(
        // private _store: Store<State>,
        private _preferenceService: UserPreferenceService,
        private _authService: AuthenticationService) {
        this._user = this.emptyUser();
        this._loginCalled = false;
        this._authService.authenticated$.subscribe(auth => {
            if (auth && !this._loginCalled) {
                this.getUser();
            } else if (!auth) {
                this._user = this.emptyUser();
            }
        });
    }

    get user() {
        return this._user;
    }

    /**
     * Check if user has specified authority.
     * @param authority - If provided authority is array of authorities.
     *                    Method make intersection of the provided authorities and user's authorities.
     *                    If calculated intersection isn't empty returns true, otherwise false.
     */
    public hasAuthority(authority: Array<string> | string): boolean {
        if (!authority || !this._user.authorities) {
            return false;
        }
        if (authority instanceof Array) {
            return authority.some(a => this._user.authorities.some(u => u === a));
        } else {
            return this._user.authorities.some(a => a === authority);
        }
    }

    public hasRole(role: Role): boolean {
        if (!role || !this._user.roles) {
            return false;
        }
        return this._user.roles.some(r => r === role);
    }

    public hasRoleById(role: string): boolean {
        if (!role || !this._user.roles) {
            return false;
        }
        return this._user.roles.some(r => r.id === role);
    }

    public login(credentials: Credentials): Observable<User> {
        this._loginCalled = true;
        return this._authService.login(credentials).pipe(
            tap((authUser: User) => {
                this._user = authUser;
                this._loginCalled = false;
            })
        );
    }

    public logout(): Observable<object> {
        return this._authService.logout().pipe(
            tap(() => this._user = this.emptyUser())
        );
    }

    private emptyUser() {
        return new User('', '', '', '', [], [], []);
    }

    private getUser(): Observable<object> {
        return of([]); // TODO call resource service
    }

}
