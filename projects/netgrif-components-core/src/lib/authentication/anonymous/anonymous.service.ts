import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {NullStorage} from '../session/null-storage';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AnonymousService implements OnDestroy {

    public static readonly X_ANONYMOUS_TOKEN = 'X-Anonymous-Token';
    protected readonly _anonymousTokenHeader: string;
    protected _storage: Storage;
    protected _tokenSet: BehaviorSubject<boolean>;

    constructor(protected _config: ConfigurationService) {
        this._anonymousTokenHeader = this._config.get().providers.auth.anonymous ?
            this._config.get().providers.auth.anonymous : AnonymousService.X_ANONYMOUS_TOKEN;
        this._storage = this.resolveStorage(this._config.get().providers.auth['local']);
        this._tokenSet = new BehaviorSubject<boolean>(false);
    }

    get anonymousTokenHeader(): string {
        return this._anonymousTokenHeader;
    }

    get tokenSet(): Observable<boolean> {
        return this._tokenSet.asObservable();
    }

    public getToken(): string {
        return this._storage.getItem(this._anonymousTokenHeader);
    }

    public setToken(token: string): void {
        this._storage.setItem(this._anonymousTokenHeader, token);
        if (!this._tokenSet.getValue())
            this._tokenSet.next(true);
    }

    public removeToken(): void {
        this._storage.removeItem(this._anonymousTokenHeader);
        this._tokenSet.next(false);
    }

    ngOnDestroy(): void {
        localStorage.removeItem(this._anonymousTokenHeader);
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
