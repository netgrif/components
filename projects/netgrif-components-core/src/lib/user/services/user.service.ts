import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {ProcessRole} from '../../resources/interface/process-role';
import {User} from '../models/user';
import {Credentials} from '../../authentication/models/credentials';
import {take, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {UserTransformer} from '../../authentication/models/user.transformer';
import {LoggerService} from '../../logger/services/logger.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionService} from '../../authentication/session/services/session.service';
import {UserResource} from '../../resources/interface/user-resource';
import {AnonymousService} from '../../authentication/anonymous/anonymous.service';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {

    protected _user: User;
    protected _userChange$: ReplaySubject<User>;
    protected _anonymousUserChange$: ReplaySubject<User>;
    protected _loginCalled: boolean;
    protected _subAuth: Subscription;
    protected _subAnonym: Subscription;
    private _publicLoadCalled: boolean;

    constructor(protected _authService: AuthenticationService,
                protected _userResource: UserResourceService,
                protected _userTransform: UserTransformer,
                protected _log: LoggerService,
                protected _session: SessionService,
                protected _anonymousService: AnonymousService) {
        this._user = this.emptyUser();
        this._loginCalled = false;
        this._userChange$ = new ReplaySubject<User>(1);
        this._anonymousUserChange$ = new ReplaySubject<User>(1);
        setTimeout(() => {
            this._subAuth = this._authService.authenticated$.subscribe(auth => {
                if (auth && !this._loginCalled) {
                    this.loadUser();
                } else if (!auth) {
                    this.clearUser();
                    this.publishUserChange();
                }
            });
        });
        this._subAnonym = this._anonymousService.tokenSet.subscribe(token => {
            if (token) {
                this.loadPublicUser();
            } else {
                this.clearUser();
                this.publishAnonymousUserChange();
            }
        });
    }

    get user() {
        return this._user;
    }

    get user$(): Observable<User> {
        return this._userChange$.asObservable();
    }

    get anonymousUser(): User {
        return this.anonymousUser;
    }

    get anonymousUser$(): Observable<User> {
        return this._anonymousUserChange$.asObservable();
    }

    ngOnDestroy(): void {
        this._userChange$.complete();
        this._anonymousUserChange$.complete();
        this._subAuth.unsubscribe();
        this._subAnonym.unsubscribe();
    }

    /**
     * Check if user has specified authority.
     * @param authority - If provided authority is array of authorities.
     *                    Method make intersection of the provided authorities and user's authorities.
     *                    If calculated intersection isn't empty returns true, otherwise false.
     */
    public hasAuthority(authority: Array<string> | string): boolean {
        const user = this._user.getSelfOrImpersonated();
        if (!authority || !user.authorities) {
            return false;
        }
        if (authority instanceof Array) {
            return authority.some(a => user.authorities.some(u => u === a));
        } else {
            return user.authorities.some(a => a === authority);
        }
    }

    public hasRole(role: ProcessRole): boolean {
        const user = this._user.getSelfOrImpersonated();
        if (!role || !user.roles) {
            return false;
        }
        return user.roles.some(r => r === role);
    }

    /**
     * Checks whether the user has role with a specific stringId
     * @param roleStringId ID of the role we want to check
     */
    public hasRoleById(roleStringId: string): boolean {
        const user = this._user.getSelfOrImpersonated();
        if (!roleStringId || !user.roles) {
            return false;
        }
        return user.roles.some(r => r.stringId === roleStringId);
    }

    /**
     * Checks whether the user has a role with the specified identifier in a process with the specified identifier (any version),
     * or if the role is global (with prefix 'global_').
     * @param roleIdentifier identifier (import ID) of the role we want to check
     * @param netIdentifier identifier (import ID) of the process the role is defined in
     */
    public hasRoleByIdentifier(roleIdentifier: string, netIdentifier: string): boolean {
        const user = this._user.getSelfOrImpersonated();
        if (!roleIdentifier || !user.roles) {
            return false;
        }

        return user.roles.some(r => {
            const matchesRole = r.importId === roleIdentifier;
            const isGlobalRole = r.importId.startsWith('global_');
            const matchesNet = r.netImportId === netIdentifier;
            return matchesRole && (isGlobalRole || matchesNet);
        });
    }

    /**
     * Checks whether the user has role with the specified name in a process with the specified identifier (any version)
     * @param roleName name of the role we want to check
     * @param netIdentifier identifier (import ID) of the process the role is defined in
     */
    public hasRoleByName(roleName: string, netIdentifier: string): boolean {
        const user = this._user.getSelfOrImpersonated();
        if (!roleName || !netIdentifier || !user.roles) {
            return false;
        }
        return user.roles.some(r => r.netImportId === netIdentifier && r.name === roleName);
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

    protected emptyUser() {
        return new User('', '', '', '', [], [], [], []);
    }

    protected loadUser(): void {
        this._userResource.getLoggedUser().pipe(take(1)).subscribe((user: UserResource) => {
            if (user) {
                const backendUser = {...user, id: user.id.toString()};
                this._user = this._userTransform.transform(backendUser);
                this.publishUserChange();
            }
        }, error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this._log.debug('Authentication token is invalid. Clearing stream');
                this._session.clear();
            } else {
                this._log.error('Loading logged user has failed! Initialisation has not be completed successfully!', error);
            }
        });
    }

    public loadPublicUser(): void {
        this._userResource.getPublicLoggedUser().pipe(take(1)).subscribe((user: UserResource) => {
            if (user) {
                const backendUser = {...user, id: user.id.toString()};
                this._user = this._userTransform.transform(backendUser);
                this.publishAnonymousUserChange();
            }
        }, error => {
            this._log.error('Loading logged user has failed! Initialisation has not be completed successfully!', error);
            this._publicLoadCalled = false;
        });
    }

    public clearUser() {
        this._user = this.emptyUser();
    }

    public isUserEmpty(user: User): boolean {
        return !user || (!user.id && user.roles.length === 0);
    }

    public isCurrentUserEmpty(): boolean {
        return this.isUserEmpty(this.user)
    }

    protected publishUserChange(): void {
        this._userChange$.next(this.user);
    }

    protected publishAnonymousUserChange(): void {
        this._anonymousUserChange$.next(this.user);
    }
}
