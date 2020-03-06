import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private _session$: BehaviorSubject<string>;

    constructor() {
    }

    get sessionTokes(): string {
        return this._session$.getValue();
    }

    set session(sessionToken: string) {
        this._session$.next(sessionToken);
    }
}
