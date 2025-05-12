import {Credentials} from '../../models/credentials';
import {Injectable, OnDestroy} from '@angular/core';
import {AuthenticationMethodService} from '../authentication-method.service';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {catchError, map, tap} from 'rxjs/operators';
import {Identity} from '../../../identity/models/Identity';
import {IdentityTransformer} from '../../models/identity.transformer';
import {SessionService} from '../../session/services/session.service';
import {IdentityResource} from '../../../resources/interface/identity-resource';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

    protected static readonly IDENTIFICATION_ATTRIBUTE = 'id';

    protected _authenticated$: BehaviorSubject<boolean>;
    protected subSession: Subscription;

    constructor(protected _auth: AuthenticationMethodService,
                protected _config: ConfigurationService,
                protected _sessionService: SessionService,
                protected _userTransformer: IdentityTransformer) {
        this._authenticated$ = new BehaviorSubject<boolean>(false);
        this.subSession = this._sessionService.session$.subscribe(token => {
            this._authenticated$.next(!!token && token.length !== 0 && this._sessionService.verified);
        });
    }

    login(credentials: Credentials): Observable<Identity> {
        return this._auth.login(credentials).pipe(
            tap((user: IdentityResource) => {
                this._authenticated$.next(!!user[AuthenticationService.IDENTIFICATION_ATTRIBUTE]);
            }),
            map((user: IdentityResource) => this._userTransformer.transform(user)),
            catchError(error => {
                console.error(error);
                return of(null);
            })
        );
    }

    logout(): Observable<object> {
        return this._auth.logout().pipe(
            tap(() => {
                this._authenticated$.next(false);
                this._sessionService.clear();
            }),
            catchError(error => {
                console.error(error);
                return of(error);
            })
        );
    }

    get isAuthenticated(): boolean {
        return this._authenticated$.getValue();
    }

    get authenticated$(): Observable<boolean> {
        return this._authenticated$.asObservable();
    }

    ngOnDestroy(): void {
        this.subSession.unsubscribe();
        this._authenticated$.complete();
    }
}
