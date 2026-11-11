import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {NullStorage} from '../null-storage';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoggerService} from '../../../logger/services/logger.service';
import {catchError, filter, finalize, map, take} from 'rxjs/operators';
import {MessageResource} from '../../../resources/interface/message-resource';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {SessionIdleTimerService} from "./session-idle-timer.service";


@Injectable({
    providedIn: 'root'
})
export class SessionService implements OnDestroy {

    public static readonly SESSION_TOKEN_STORAGE_KEY = 'naet';
    public static readonly SESSION_BEARER_HEADER_DEFAULT = 'X-Auth-Token';

    private _session$: BehaviorSubject<string>;
    private _storage: Storage | NullStorage = new NullStorage();
    private _sessionHeader: string | null = null;
    private _verified: boolean;
    private _verifying: LoadingEmitter;
    private _initialized: LoadingEmitter;

    constructor(private _config: ConfigurationService,
                private _log: LoggerService,
                private _http: HttpClient,
                private idleTimerService: SessionIdleTimerService) {

        this._session$ = new BehaviorSubject<string>(null);
        this._verified = false;
        this.idleTimerService.stopTimer();
        this._verifying = new LoadingEmitter();
        this._initialized = new LoadingEmitter(false);
        setTimeout(() => {
            this._config.loaded$
                .pipe(
                    filter(loaded => loaded),
                    take(1)
                )
                .subscribe(() => {
                    this._storage = this.resolveStorage(this._config.get().providers.auth['sessionStore']);
                    this._sessionHeader = this._config.get().providers.auth.sessionBearer ?
                        this._config.get().providers.auth.sessionBearer : SessionService.SESSION_BEARER_HEADER_DEFAULT;
                    this.ensureConfigInitialized();
                    this.load();
                });
        });
    }

    ngOnDestroy(): void {
        this._session$.complete();
        this._verifying.complete();
        this._initialized.complete();
    }

    get session$(): Observable<string> {
        return this._session$.asObservable();
    }

    set sessionToken(sessionToken: string) {
        this.ensureConfigInitialized();
        this._session$.next(sessionToken);
        this._storage.setItem(SessionService.SESSION_TOKEN_STORAGE_KEY,
            btoa(SessionService.SESSION_TOKEN_STORAGE_KEY + ':' + sessionToken));
    }

    get sessionToken(): string {
        return this._session$.getValue();
    }

    get sessionHeader(): string {
        this.ensureConfigInitialized();
        return this._sessionHeader!;
    }

    get verified(): boolean {
        return this._verified;
    }

    get verifying(): Observable<boolean> {
        return this._verifying.asObservable();
    }

    get isVerifying(): boolean {
        return this._verifying.isActive;
    }

    get isInitialized(): boolean {
        return this._initialized.isActive;
    }

    get initializing(): Observable<boolean> {
        return this._initialized.asObservable();
    }

    public setVerifiedToken(sessionToken: string) {
        this._log.warn('Session token without explicit verification was set');
        this.idleTimerService.resetTimer();
        this._verified = true;
        this.sessionToken = sessionToken;
    }

    public clear(): void {
        this.idleTimerService.stopTimer();
        this._verified = false;
        this.sessionToken = '';
        this._storage.removeItem(SessionService.SESSION_TOKEN_STORAGE_KEY);
    }

    public verify(token?: string): Observable<boolean> {
        this.ensureConfigInitialized();

        this._verifying.on();
        token = !!token ? token : this.sessionToken;

        const authConfig = this._config.get().providers.auth;
        let url = authConfig.address;
        url += authConfig.endpoints && authConfig.endpoints['verification'] ? authConfig.endpoints['verification'] :
            (authConfig.endpoints && authConfig.endpoints['login'] ? authConfig.endpoints['login'] : '');
        if (!url || url === authConfig.address) {
            this.clear();
            this._verifying.off();
            this._initialized.on();
            return throwError(new Error('Cannot verify session token. ' +
                'Login URL is not defined in the config [nae.providers.auth.endpoints.login].'));
        } else {
            return this._http.get<MessageResource>(url, {
                headers: new HttpHeaders().set(this.sessionHeader, token),
                observe: 'response'
            }).pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 401 && this.sessionToken === token) {
                        this._log.warn('Authentication token is invalid. Clearing session token');
                        this.clear();
                    }
                    return throwError(error);
                }),
                map(response => {
                    if (this.sessionToken !== token) {
                        return this.verified;
                    }
                    this._log.debug(response.body.success);
                    this._verified = true;
                    this.idleTimerService.resetTimer();
                    this.sessionToken = response.headers.get(this.sessionHeader) || token;
                    return true;
                }),
                finalize(() => {
                    this._verifying.off();
                    this._initialized.on();
                })
            );
        }
    }

    protected load(): string {
        this.ensureConfigInitialized();
        if (this.verified && this.sessionToken) {
            this._initialized.on();
            return this.sessionToken;
        }

        const token = this.resolveToken(this._storage.getItem(SessionService.SESSION_TOKEN_STORAGE_KEY));
        this._verified = false;
        this.idleTimerService.stopTimer();
        if (token) {
            this.sessionToken = token;
            this.verify(token).pipe(take(1)).subscribe({
                next: verified => this._log.debug('Stored session verified: ' + verified),
                error: () => this._log.warn('Stored session could not be restored')
            });
        } else {
            this.clear();
            this._initialized.on();
        }
        return '';
    }

    private ensureConfigInitialized(): void {
        if (this._sessionHeader && !(this._storage instanceof NullStorage)) {
            return;
        }
        const cfg = this._config.get();
        const sessionStore = cfg.providers.auth['sessionStore'];
        this._storage = this.resolveStorage(sessionStore);
        this._sessionHeader = cfg.providers.auth.sessionBearer
            ? cfg.providers.auth.sessionBearer
            : SessionService.SESSION_BEARER_HEADER_DEFAULT;
    }

    private resolveToken(raw: string): string {
        try {
            const [key, token] = raw ? atob(raw).split(':') : [];
            return key === SessionService.SESSION_TOKEN_STORAGE_KEY ? token || '' : '';
        } catch {
            return '';
        }
    }

    private resolveStorage(storage: string): any {
        switch (storage) {
            case 'local':
                return localStorage;
            case 'session':
                return sessionStorage;
            case 'null':
                return new NullStorage();
            default:
                return localStorage;
        }
    }
}
