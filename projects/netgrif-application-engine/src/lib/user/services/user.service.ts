import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import Role from '../models/role';
import {User} from '../models/user';
import {Credentials} from '../../authentication/models/credentials';
import {User as UserResource} from '../../resources/interface/user';
import {User as AuthUser} from '../../authentication/models/user';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {UserTransformer} from '../../authentication/models/user.transformer';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: User;
    private _userChange$: Subject<User>;
    private _loginCalled: boolean;

    constructor(private _authService: AuthenticationService,
                private _userResource: UserResourceService,
                private _userTransform: UserTransformer) {
        this._user = this.emptyUser();
        this._loginCalled = false;
        this._userChange$ = new Subject<User>();
        _authService.authenticated$.subscribe(auth => {
            if (auth && !this._loginCalled) {
                this.loadUser();
            } else if (!auth) {
                this._user = this.emptyUser();
                this.publishUserChange();
            }
        });
    }

    get user() {
        return this._user;
    }

    get user$(): Observable<User> {
        return this._userChange$.asObservable();
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
                this.publishUserChange();
            })
        );
    }

    public logout(): Observable<object> {
        return this._authService.logout().pipe(
            tap(() => {
                this._user = this.emptyUser();
                this.publishUserChange();
            })
        );
    }

    public reload(): void {
        this.loadUser();
    }

    private emptyUser() {
        return new User('', '', '', '', [], [], []);
    }

    private loadUser(): void {
        this._userResource.getLoggedUser().subscribe((user: UserResource) => {
            if (user) {
                const backendUser = {...user, id: user.id.toString()};
                this._user = this._userTransform.transform(backendUser as AuthUser);
                this.publishUserChange();
            }
        });
    }

    private publishUserChange(): void {
        this._userChange$.next(this.user);
    }

}
