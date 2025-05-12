import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {Identity} from '../models/Identity';
import {Credentials} from '../../authentication/models/credentials';
import {take, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {IdentityResourceService} from '../../resources/engine-endpoint/identity-resource.service';
import {IdentityTransformer} from '../../authentication/models/identity.transformer';
import {LoggerService} from '../../logger/services/logger.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionService} from '../../authentication/session/services/session.service';
import {IdentityResource} from '../../resources/interface/identity-resource';
import {AnonymousService} from '../../authentication/anonymous/anonymous.service';

@Injectable({
    providedIn: 'root'
})
export class IdentityService implements OnDestroy {

    protected _identity: Identity;
    protected _identityChange$: ReplaySubject<Identity>;
    protected _anonymousIdentityChange$: ReplaySubject<Identity>;
    protected _loginCalled: boolean;
    protected _subAuth: Subscription;
    protected _subAnonym: Subscription;
    private _publicLoadCalled: boolean;

    constructor(protected _authService: AuthenticationService,
                protected _identityResource: IdentityResourceService,
                protected _identityTransform: IdentityTransformer,
                protected _log: LoggerService,
                protected _session: SessionService,
                protected _anonymousService: AnonymousService) {
        this._identity = this.emptyIdentity();
        this._loginCalled = false;
        this._identityChange$ = new ReplaySubject<Identity>(1);
        this._anonymousIdentityChange$ = new ReplaySubject<Identity>(1);
        setTimeout(() => {
            this._subAuth = this._authService.authenticated$.subscribe(auth => {
                if (auth && !this._loginCalled) {
                    this.loadIdentity();
                } else if (!auth) {
                    this.clearIdentity();
                    this.publishIdentityChange();
                }
            });
        });
        this._subAnonym = this._anonymousService.tokenSet.subscribe(token => {
            if (token) {
                this.loadPublicIdentity();
            } else {
                this.clearIdentity();
                this.publishAnonymousIdentityChange();
            }
        });
    }

    get identity() {
        return this._identity;
    }

    get identity$(): Observable<Identity> {
        return this._identityChange$.asObservable();
    }

    get anonymousIdentity$(): Observable<Identity> {
        return this._anonymousIdentityChange$.asObservable();
    }

    ngOnDestroy(): void {
        this._identityChange$.complete();
        this._anonymousIdentityChange$.complete();
        this._subAuth.unsubscribe();
        this._subAnonym.unsubscribe();
    }

    public login(credentials: Credentials): Observable<Identity> {
        this._loginCalled = true;
        return this._authService.login(credentials).pipe(
            tap((authIdentity: Identity) => {
                this._identity = authIdentity;
                this._loginCalled = false;
                this.publishIdentityChange();
            })
        );
    }

    public logout(): Observable<object> {
        return this._authService.logout().pipe(
            tap(() => {
                this._identity = this.emptyIdentity();
                this.publishIdentityChange();
            })
        );
    }

    public reload(): void {
        this.loadIdentity();
    }

    protected emptyIdentity() {
        return new Identity('', '', '', '', '');
    }

    protected loadIdentity(): void {
        this._identityResource.getLoggedIdentity().pipe(take(1)).subscribe((identity: IdentityResource) => {
            if (identity) {
                const backendIdentity = {...identity, id: identity.id.toString()};
                this._identity = this._identityTransform.transform(backendIdentity);
                this.publishIdentityChange();
            }
        }, error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this._log.debug('Authentication token is invalid. Clearing stream');
                this._session.clear();
            } else {
                this._log.error('Loading logged identity has failed! Initialisation has not be completed successfully!', error);
            }
        });
    }

    public loadPublicIdentity(): void {
        this._identityResource.getPublicLoggedUser().pipe(take(1)).subscribe((identity: IdentityResource) => {
            if (identity) {
                const backendIdentity = {...identity, id: identity.id.toString()};
                this._identity = this._identityTransform.transform(backendIdentity);
                this.publishAnonymousIdentityChange();
            }
        }, error => {
            this._log.error('Loading logged identity has failed! Initialisation has not be completed successfully!', error);
            this._publicLoadCalled = false;
        });
    }

    public clearIdentity() {
        this._identity = this.emptyIdentity();
    }

    public isIdentityEmpty(user: Identity): boolean {
        return !user || !user.id;
    }

    public isCurrentIdentityEmpty(): boolean {
        return this.isIdentityEmpty(this.identity)
    }

    protected publishIdentityChange(): void {
        this._identityChange$.next(this.identity);
    }

    protected publishAnonymousIdentityChange(): void {
        this._anonymousIdentityChange$.next(this.identity);
    }
}
