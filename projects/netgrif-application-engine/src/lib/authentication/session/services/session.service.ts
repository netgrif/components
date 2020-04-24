import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {NullStorage} from '../null-storage';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public static readonly SESSION_TOKEN_STORAGE_KEY = 'naet';
    public static readonly SESSION_BEARER_HEADER_DEFAULT = 'X-Auth-Token';

    private _session$: BehaviorSubject<string>;
    private _storage: Storage;
    private readonly _sessionHeader: string;

    constructor(private _config: ConfigurationService) {
        // const sessionConfig = this._config.get().providers.auth.session;
        this._storage = this.resolveStorage(this._config.get().providers.auth['sessionStore']);
        this._sessionHeader = this._config.get().providers.auth.sessionBearer ?
            this._config.get().providers.auth.sessionBearer : SessionService.SESSION_BEARER_HEADER_DEFAULT;
        this._session$ = new BehaviorSubject<string>(null);
        this.load();
    }

    get session$(): Observable<string> {
        return this._session$.asObservable();
    }

    set sessionToken(sessionToken: string) {
        this._session$.next(sessionToken);
        this._storage.setItem(SessionService.SESSION_TOKEN_STORAGE_KEY,
            btoa(SessionService.SESSION_TOKEN_STORAGE_KEY + ':' + sessionToken));
    }

    get sessionToken(): string {
        return this._session$.getValue();
    }

    get sessionHeader(): string {
        return this._sessionHeader;
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
