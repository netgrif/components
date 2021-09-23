import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {NullStorage} from '../session/null-storage';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AnonymousService implements OnDestroy {

    public static readonly JWT_BEARER_HEADER_DEFAULT = 'X-Jwt-Token';
    protected readonly _jwtHeader: string;
    protected _storage: Storage;
    protected _tokenSet: BehaviorSubject<boolean>;

    constructor(protected _config: ConfigurationService) {
        this._jwtHeader = this._config.get().providers.auth.jwtBearer ?
            this._config.get().providers.auth.jwtBearer : AnonymousService.JWT_BEARER_HEADER_DEFAULT;
        this._storage = this.resolveStorage(this._config.get().providers.auth['local']);
        this._tokenSet = new BehaviorSubject<boolean>(false);
    }

    get jwtHeader(): string {
        return this._jwtHeader;
    }

    get tokenSet(): Observable<boolean> {
        return this._tokenSet.asObservable();
    }

    public getToken(): string | null {
        return this._storage.getItem(this._jwtHeader);
    }

    public setToken(token: string): void {
        this._storage.setItem(this._jwtHeader, token);
        if (!this._tokenSet.getValue())
            this._tokenSet.next(true);
    }

    public removeToken(): void {
        this._storage.removeItem(this._jwtHeader);
        this._tokenSet.next(false);
    }

    ngOnDestroy(): void {
        localStorage.removeItem(this._jwtHeader);
        this._tokenSet.complete();
    }

    protected resolveStorage(storage: string): any {
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
