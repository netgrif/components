import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {NullStorage} from '../NullStorage';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements HttpInterceptor {

    public static readonly SESSION_TOKEN_STORAGE_KEY = 'naet';

    private _session$: BehaviorSubject<string>;
    private _storage: Storage;
    private _sessionHeader: string;

    constructor(private _config: ConfigurationService) {
        this._storage = this._config.get().providers.auth.session.store ? localStorage : new NullStorage();
        this._sessionHeader = this._config.get().providers.auth.sessionBearer ?
            this._config.get().providers.auth.sessionBearer : 'x-auth-token';
    }

    get session$(): Observable<string> {
        return this._session$;
    }

    set sessionToken(sessionToken: string) {
        this._session$.next(sessionToken);
        this._storage.setItem(SessionService.SESSION_TOKEN_STORAGE_KEY,
            btoa(SessionService.SESSION_TOKEN_STORAGE_KEY + ':' + sessionToken));
    }

    get sessionToken(): string {
        return this._session$.getValue();
    }

    clear(): void {
        this.sessionToken = null;
        this._storage.removeItem(SessionService.SESSION_TOKEN_STORAGE_KEY);
    }

    protected load(): void {
        const token = this._storage.getItem(SessionService.SESSION_TOKEN_STORAGE_KEY);
        if (token) {
            this.sessionToken = atob(token).split(':')[1];
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.sessionToken) {
            req = req.clone({
                headers: req.headers.set(this._sessionHeader, this.sessionToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.headers.has(this._sessionHeader)) {
                        this.sessionToken = event.headers.get(this._sessionHeader);
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing stream');
                    this.clear();
                }
                return throwError(errorEvent);
            })
        );
    }
}
