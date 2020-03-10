import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import Role from "../models/role";
import {User} from "../models/user";
import Credentials from "../../authentication/models/credentials";
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {tap} from "rxjs/operators";
import {ActionType} from "../models/action-type";
import {UserPreferenceService} from './user-preference.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: User;

    constructor(
                // private _store: Store<State>,
                private _preferenceService: UserPreferenceService,
                private _authService: AuthenticationService) {
    }

    public login(credentials: Credentials): Observable<User> {
        // TODO: NgRx store
        // this._store.dispatch(loginUser({user: user}));

        return this._authService.login(credentials)
            .pipe(
                tap((authUser: User) => {
                    this._user = authUser;
                    this._preferenceService.user = authUser;
                })
            );
    }

    public getLoggedUser(): User {
        // TODO: NgRx store
        // return this._store.select(selectLoggedUser)

        return this._user;
    }

    /**
     * Check if user has specified authority
     * @param {Array<string> / string} auth
     * @returns {boolean}
     */
    public hasAuthority(auth: Array<string> | string): boolean {
        if (!auth || !this._user.authorities) return false;
        if (auth instanceof Array) {
            return auth.some(a => this._user.authorities.some(u => u === a));
        } else
            return this._user.authorities.some(a => a === auth);
    }

    public hasPermision(permission: string): boolean {
        if (!permission) return false;
        const perm = "PERM_" + permission.toUpperCase();
        return this.hasAuthority(perm);
    }

    public changeRoles(roles: Array<Role>): void {
        if (roles instanceof Array) {
            this._user.roles = roles;
        }
    }

    public hasRole(role: Role): boolean {
        if (!role || !this._user.roles) return false;
        return this._user.roles.some(r => r === role);
    }

    /**
     * Check if user can perform specified action
     * @param {Role} roles
     * @param {ActionType} action
     * @returns {boolean}
     */
    public canDo(roles: Role, action: ActionType): boolean {
        if (!action || !this._user.roles || !(roles instanceof Object)) return false;
        return this._user.roles.some(role => role.stringId === roles.stringId ? role.actions.get(action) : false);
    }

    public logout(): void {
        // TODO: NgRx store
        // this._store.dispatch(logoutUser)

        this._user = null
    }

}
