import Credentials from '../../models/credentials';
import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from '../authentication-method.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ProcessRole, User as AuthUser} from '../../models/user';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../../../user/models/user';
import Role from '../../../user/models/role';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private static readonly IDENTIFICATION_ATTRIBUTE = 'username'; // TODO change for ID

    private _authenticated$: BehaviorSubject<boolean>;

    constructor(private _auth: AuthenticationMethodService, private _config: ConfigurationService) {

    }

    login(credentials: Credentials): Observable<User> {
        return this._auth.login(credentials).pipe(
            tap((user: AuthUser) => {
                this._authenticated$.next(!!user[AuthenticationService.IDENTIFICATION_ATTRIBUTE]);
            }),
            map((user: AuthUser) => {
                const groups: Array<string> = []; // TODO groups parsing
                // TODO User resource parser

                const authorities: Array<string> = !user.authorities ? [] : user.authorities.map(a => a.authority);
                const roles: Array<Role> = !user.processRoles ? [] : user.processRoles.map((r: ProcessRole) => ({
                    id: r.stringId, name: r.name, description: r.description
                }));
                if (user.userProcessRoles) {
                    roles.forEach(r => {
                        const userRole = user.userProcessRoles.find(rl => rl.roleId === r.id);
                        if (userRole) {
                            r.net = userRole.netId;
                        }
                    });
                }

                return new User(
                    user.id,
                    user.email,
                    user.name,
                    user.surname,
                    authorities,
                    roles,
                    groups);
            }),
            catchError(error => {
                console.error(error);
                return of(null);
            })
        );
    }

    logout(): Observable<object> {
        return this._auth.logout().pipe(
            tap(() => this._authenticated$.next(false)),
            catchError(error => {
                console.error(error);
                return of(error);
            })
        );
    }

    isAuthenticated(): boolean {
        return this._authenticated$.getValue();
    }

    get authenticated$(): BehaviorSubject<boolean> {
        return this._authenticated$;
    }
}
