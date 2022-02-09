import {Credentials} from '../../models/credentials';
import {Injectable, OnDestroy} from '@angular/core';
import {AuthenticationMethodService} from '../authentication-method.service';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../../../user/models/user';
import {UserTransformer} from '../../models/user.transformer';
import {SessionService} from '../../session/services/session.service';
import {UserResource} from '../../../resources/interface/user-resource';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

    private static readonly IDENTIFICATION_ATTRIBUTE = 'id';

    private _authenticated$: BehaviorSubject<boolean>;
    protected subSession: Subscription;

    constructor(private _auth: AuthenticationMethodService,
                private _config: ConfigurationService,
                private _sessionService: SessionService,
                private _userTransformer: UserTransformer) {
        this._authenticated$ = new BehaviorSubject<boolean>(false);
        this.subSession = this._sessionService.session$.subscribe(token => {
            this._authenticated$.next(!!token && token.length !== 0 && this._sessionService.verified);
        });
    }

    login(credentials: Credentials): Observable<User> {
        return this._auth.login(credentials).pipe(
            tap((user: UserResource) => {
                this._authenticated$.next(!!user[AuthenticationService.IDENTIFICATION_ATTRIBUTE]);
            }),
            map((user: UserResource) => this._userTransformer.transform(user)),
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
